function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function fetchFavFoods() {
  return new Promise((resolve, reject) => {
    try {
      // fake API call
      setTimeout(() => resolve(this.foods), 1000);
    } catch(err) {
      reject(err);
    }
  })
}

function PersonNew(name, foods) {
  this.name = name;
  this.foods = foods;
  this.fetchFavFoods = function fetchFavFoods() {
    return new Promise((resolve, reject) => {
      try {
        // fake API call
        setTimeout(() => resolve(this.foods), 1000);
      } catch(err) {
        reject(err);
      }
    })
  }
}

describe.skip('mocking learning', () => {
  it('can create a person', async () => {
    const me = new Person('Nurbek', ['pineapple', 'kazy']);
    expect(me.name).toEqual('Nurbek');
    me.fetchFavFoods = jest.fn().mockResolvedValue(['kazy', 'besh']);
    const favFoods = await me.fetchFavFoods();
    expect(favFoods).toContain('kazy');
  });
  
  // it('can create a person with new style', async () => {
  //   const bro = new PersonNew('Bekzhan', ['pineapple', 'kazy']);
  //   expect(bro.name).toEqual('Bekzhan');
  //   const favFoods = await bro.fetchFavFoods();
  //   expect(favFoods).toContain('pineapple');
  // })
})