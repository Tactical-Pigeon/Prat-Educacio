class Pokemon {
  String name;
  int hp;
  int maxHp;
  int pp;
  int maxPp;

  Pokemon({
    required this.name,
    required this.maxHp,
    required this.maxPp,
  })  : hp = maxHp,
        pp = maxPp;

  void takeDamage(int damage) {
    hp -= damage;
    if (hp < 0) hp = 0;
  }

  void heal(int amount) {
    hp += amount;
    if (hp > maxHp) hp = maxHp;
  }

  bool canUseMove(int ppCost) {
    return pp >= ppCost && hp > 0;
  }

  void usePp(int ppCost) {
    pp -= ppCost;
    if (pp < 0) pp = 0;
  }

  bool get isFainted => hp == 0;
}