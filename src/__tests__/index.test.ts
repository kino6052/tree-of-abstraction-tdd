interface Item {
  title: string
}

class ItemService {
  static addItem = (item: Item, items: Item[]) => [...items, item]
  static getTitles = (items: Item[]) => items.map(i => i.title)
}

describe('...', () => {
  it('should add an item', () => {
    const items: Item[] = []
    const item: Item = {
      title: 'Title',
    }
    expect(ItemService.getTitles(ItemService.addItem(item, items))).toEqual([
      'Title',
    ])
    expect(
      ItemService.getTitles(
        ItemService.addItem(item, ItemService.addItem(item, items))
      )
    ).toEqual(['Title', 'Title'])
  })
  it('should update an item', () => {
    expect.hasAssertions()
  })
  it('should delete an item', () => {
    expect.hasAssertions()
  })
})
