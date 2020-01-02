interface Item {
  title: string
}

interface ItemWithId extends Item {
  id: string
}

class ItemService {
  static addItem = (item: Item, items: Item[]) => [...items, item]
  static deleteItem = (id: string, items: ItemWithId[]) =>
    items.filter(i => i.id !== id)
  static updateItem = (item: Item, newItem: Item, items: Item[]) =>
    items.map(i => (i === item ? newItem : i))
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
    const updateItem = ItemService.updateItem
    expect(ItemService.getTitles(updateItem(item, newItem, items))).toEqual([
      newItem.title,
    ])
    expect.hasAssertions()
  })
  it('should delete an item', () => {
    const getTitles = (items: Item[]) => ItemService.getTitles(items)
    const deleteItem = ItemService.deleteItem
    const items: ItemWithId[] = [
      {
        id: '1',
        title: 'test',
      },
    ]
    expect(getTitles(items)).toEqual([items[0].title])
    expect(getTitles(deleteItem(items[0].id, items))).toEqual([])
    expect.hasAssertions()
  })
  it('should be able to assign parent to item', () => {
    expect(getParentIds(setParent(items[0], items[1]))).toEqual([
      items[1].id,
      '',
    ])
    expect.hasAssertions()
  })
})
