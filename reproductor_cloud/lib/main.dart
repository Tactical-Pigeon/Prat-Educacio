import 'dart:math';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:just_audio/just_audio.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(
    url: 'https://cyjlvhlvqyegbkruqocr.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5amx2aGx2cXllZ2JrcnVxb2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjE1NTIsImV4cCI6MjA5Mzg5NzU1Mn0.lKk5hxTJa_z5ilNYExpIC_oRFT7BMFG3RUlTiGKUm0g',
  );
  runApp(const MyApp());
}

final supabase = Supabase.instance.client;

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        primaryColor: const Color(0xFF1F3864),
        scaffoldBackgroundColor: const Color(0xFF121212),
      ),
      home: const MusicPlayerScreen(),
    );
  }
}

class MusicPlayerScreen extends StatefulWidget {
  const MusicPlayerScreen({super.key});
  @override
  State<MusicPlayerScreen> createState() => _MusicPlayerScreenState();
}

class _MusicPlayerScreenState extends State<MusicPlayerScreen> {
  final AudioPlayer _player = AudioPlayer();
  List<FileObject> _songs = [];
  List<FileObject> _filteredSongs = [];
  FileObject? _currentSong;
  
  bool _isLoading = true;
  bool _isShuffle = false; 
  bool _isTransitioning = false; 
  double _currentVolume = 0.5;
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadSongs();
    _setupAudioListeners();
  }

  @override
  void dispose() {
    _player.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _setupAudioListeners() {
    _player.playerStateStream.listen((state) {
      // We only trigger when the song fully finishes naturally
      if (state.processingState == ProcessingState.completed) {
        _nextSong();
      }
    });
  }

  Future<void> _loadSongs() async {
    try {
      final List<FileObject> files = await supabase.storage.from('songs').list();
      final onlySongs = files.where((f) => !f.name.contains('.emptyFolderPlaceholder')).toList();

      setState(() {
        _songs = onlySongs;
        _filteredSongs = onlySongs;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint("Error loading songs: $e");
    }
  }

  void _filterSongs(String query) {
    setState(() {
      _filteredSongs = _songs.where((s) => s.name.toLowerCase().contains(query.toLowerCase())).toList();
    });
  }

  Future<void> _playSong(FileObject song) async {
    if (_isTransitioning) return;
    
    try {
      setState(() { 
        _isTransitioning = true;
        _currentSong = song; 
      });

      final String url = supabase.storage.from('songs').getPublicUrl(song.name);
      
      await _player.stop(); 
      await _player.setUrl(url);
      await _player.setVolume(_currentVolume);
      
      _player.play();
    } on PlayerInterruptedException {
      debugPrint("Load interrupted - expected behavior during manual skips");
    } catch (e) {
      debugPrint("Playback error: $e");
    } finally {
      if (mounted) setState(() => _isTransitioning = false);
    }
  }

  void _nextSong() {
    if (_filteredSongs.isEmpty) return;
    
    // 1. Identify where we are in the CURRENT list
    int currentIndex = -1;
    if (_currentSong != null) {
      currentIndex = _filteredSongs.indexWhere((s) => s.name == _currentSong!.name);
    }
    
    int nextIndex;

    // 2. Determine the next index based STRICTLY on shuffle state
    if (_isShuffle) {
      // Pick a random song that isn't the current one (if possible)
      if (_filteredSongs.length > 1) {
        nextIndex = currentIndex;
        while (nextIndex == currentIndex) {
          nextIndex = Random().nextInt(_filteredSongs.length);
        }
      } else {
        nextIndex = 0;
      }
    } else {
      // Linear progression
      nextIndex = currentIndex + 1;
      
      // 3. Handle list boundaries
      if (nextIndex >= _filteredSongs.length) {
        if (_player.loopMode == LoopMode.all) {
          nextIndex = 0; // Wrap to start
        } else {
          _player.stop(); // End of queue
          return;
        }
      }
    }

    _playSong(_filteredSongs[nextIndex]);
  }

  void _prevSong() {
    if (_filteredSongs.isEmpty) return;
    int currentIndex = _filteredSongs.indexWhere((s) => s.name == _currentSong!.name);
    int prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = _filteredSongs.length - 1;
    _playSong(_filteredSongs[prevIndex]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Cloud Player AE4')),
      body: _isLoading 
          ? const Center(child: CircularProgressIndicator()) 
          : Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: TextField(
                    controller: _searchController,
                    onChanged: _filterSongs,
                    decoration: InputDecoration(
                      hintText: 'Search songs...',
                      prefixIcon: const Icon(Icons.search),
                      filled: true, fillColor: Colors.white10,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                    ),
                  ),
                ),
                Expanded(child: ListView.builder(
                  itemCount: _filteredSongs.length,
                  itemBuilder: (context, index) {
                    final s = _filteredSongs[index];
                    final isCurrent = _currentSong?.name == s.name;
                    return ListTile(
                      leading: Icon(Icons.music_note, color: isCurrent ? Colors.blue : Colors.white),
                      title: Text(s.name, style: TextStyle(color: isCurrent ? Colors.blue : Colors.white)),
                      onTap: () => _playSong(s),
                    );
                  },
                )),
                if (_currentSong != null) _buildPlayerPanel(),
              ],
            ),
    );
  }

  Widget _buildPlayerPanel() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 15),
      decoration: const BoxDecoration(
        color: Color(0xFF1F3864),
        borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              const Icon(Icons.music_note, color: Colors.blueAccent),
              const SizedBox(width: 12),
              Expanded(child: Text(_currentSong?.name ?? "", overflow: TextOverflow.ellipsis)),
              const Icon(Icons.volume_down, size: 14),
              SizedBox(
                width: 80, 
                child: Slider(
                  value: _currentVolume,
                  onChanged: (v) {
                    setState(() {
                      _currentVolume = v;
                      _player.setVolume(v);
                    });
                  },
                ),
              ),
            ],
          ),
          
          StreamBuilder<Duration>(
            stream: _player.positionStream,
            builder: (context, snap) {
              final pos = snap.data ?? Duration.zero;
              final total = _player.duration ?? Duration.zero;
              return Slider(
                value: pos.inSeconds.toDouble().clamp(0.0, total.inSeconds.toDouble() + 1.0),
                max: total.inSeconds.toDouble() > 0 ? total.inSeconds.toDouble() : 1.0,
                onChanged: (v) => _player.seek(Duration(seconds: v.toInt())),
              );
            },
          ),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                icon: Icon(Icons.shuffle, color: _isShuffle ? Colors.blue : Colors.white),
                onPressed: () => setState(() => _isShuffle = !_isShuffle),
              ),
              IconButton(icon: const Icon(Icons.skip_previous, size: 30), onPressed: _prevSong),
              StreamBuilder<bool>(
                stream: _player.playingStream,
                builder: (context, snap) => IconButton(
                  icon: Icon(snap.data == true ? Icons.pause_circle : Icons.play_circle, size: 55, color: Colors.blueAccent),
                  onPressed: snap.data == true ? _player.pause : _player.play,
                ),
              ),
              IconButton(icon: const Icon(Icons.skip_next, size: 30), onPressed: _nextSong),
              
              IconButton(
                icon: Icon(
                  Icons.repeat,
                  color: _player.loopMode == LoopMode.all ? Colors.blue : Colors.white,
                ),
                onPressed: () {
                  setState(() {
                    if (_player.loopMode == LoopMode.off) {
                      _player.setLoopMode(LoopMode.all); 
                    } else {
                      _player.setLoopMode(LoopMode.off);
                    }
                  });
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}