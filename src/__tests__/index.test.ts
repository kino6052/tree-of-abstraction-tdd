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
    const item: Item = {
      title: 'One',
    }
    const newItem: Item = {
      title: 'Two',
    }
    const items = [item]
    const updateItem = (item: Item, newItem: Item, items: Item[]) =>
      items.map(i => (i === item ? newItem : i))
    expect(ItemService.getTitles(updateItem(item, newItem, items))).toEqual([
      newItem.title,
    ])
    expect.hasAssertions()
  })
  it('should delete an item', () => {
    expect.hasAssertions()
  })
})
