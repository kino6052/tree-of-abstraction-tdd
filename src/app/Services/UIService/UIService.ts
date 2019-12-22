import { APIGateway } from '../../APIGateway'
import { UI, Option } from '../../UI'
import { RedditEndpoint } from '../../Interface/Modules/RedditInterface'

const UIService = {
  pick: (subreddit: Option) => {
    UI.setIsFetching(true)
    APIGateway.send(
      { type: RedditEndpoint.GetSubreddits, parameters: { subreddit } },
      response => {
        const {
          payload: { data },
        } = response
        UI.setPosts(data.map(v => v.data))
      }
    )
  },
}

APIGateway.onInit.subscribe(async () => {
  UI.PickerStateSubject.subscribe(({ value }) => UIService.pick(value))
})
