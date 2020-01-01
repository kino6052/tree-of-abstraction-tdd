describe('...', () => {
  it('should add an item', () => {
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
