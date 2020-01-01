describe('...', () => {
  it('should add an item', () => {
    interface Item {
      title: string
    }
    const item: Item = {
      title: 'Title',
    }
    const items: Item[] = []
    const addItem = (item: Item, items: Item[]) => [...items, item]
    const getTitles = (items: Item[]) => items.map(i => i.title)
    expect(getTitles(addItem(item, items))).toEqual(['Title'])
    expect(getTitles(addItem(item, addItem(item, items)))).toEqual([
      'Title',
      'Title',
    ])
  })
  it('should update an item', () => {
    expect.hasAssertions()
  })
  it('should delete an item', () => {
    expect.hasAssertions()
  })
})
