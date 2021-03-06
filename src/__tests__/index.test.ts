interface Item {
  title: string
}

interface ItemWithId extends Item {
  id: string
}

interface HierarchicalItem extends ItemWithId {
  parentId: string
}

class ItemService {
  static addItem = (item: Item, items: Item[]) => [...items, item]
  static deleteItem = (id: string, items: ItemWithId[]) =>
    items.filter(i => i.id !== id)
  static updateItem = (item: Item, newItem: Item, items: Item[]) =>
    items.map(i => (i === item ? newItem : i))
  static getTitles = (items: Item[]) => items.map(i => i.title)
  static getParentIds = (items: HierarchicalItem[]) =>
    items.map(i => i.parentId)
  static getIds = (items: ItemWithId[]) => items.map(i => i.id)
  static setParent = (
    to: HierarchicalItem,
    from: HierarchicalItem,
    items: HierarchicalItem[]
  ) =>
    items.map(i => {
      if (i.id === to.id) {
        i.parentId = from.id
      }
      return i
    })
  static switchPlaces = (
    first: ItemWithId,
    second: ItemWithId,
    items: ItemWithId[]
  ) =>
    items.map(i => {
      if (i.id === first.id) {
        return second
      } else if (i.id === second.id) {
        return first
      }
    }) as ItemWithId[]
  static searchByTitle = (title: string, items: Item[]) =>
    items.filter(i => i.title.toLowerCase().includes(title.toLowerCase()))
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
    const items: HierarchicalItem[] = [
      {
        id: '1',
        parentId: '',
        title: '1',
      },
      {
        id: '2',
        parentId: '',
        title: '2',
      },
    ]
    const getParentIds = ItemService.getParentIds
    const setParent = ItemService.setParent
    expect(getParentIds(setParent(items[0], items[1], items))).toEqual([
      items[1].id,
      '',
    ])
    expect.hasAssertions()
  })
  it('should switch places of items', () => {
    const items: ItemWithId[] = [
      { id: '1', title: '1' },
      { id: '2', title: '2' },
    ]
    const getIds = ItemService.getIds
    const switchPlaces = ItemService.switchPlaces
    expect(getIds(switchPlaces(items[0], items[1], items))).toEqual([
      items[1].id,
      items[0].id,
    ])
    expect.hasAssertions()
  })
  it('should find items by title', () => {
    const getTitles = ItemService.getTitles
    const searchByTitle = ItemService.searchByTitle
    expect(
      getTitles(
        searchByTitle('tEst', [
          { title: 'test 123' },
          { title: 'Tes' },
          { title: 'Test1' },
        ])
      )
    ).toEqual(['test 123', 'Test1'])
    expect.hasAssertions()
  })
})
