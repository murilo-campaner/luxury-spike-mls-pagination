# Spike: MLS Search - Open listing details in the same tab

## Current State
Currently in MLS Search, when the user performs a search and clicks one of the result cards to see the details of a property, the property details page opens in a new browser tab.

## The problem
We have received numerous customer requests to change this behavior by opening the property details in the same browser tab due the SEO impact / user experience.

## Solution 1: Replace the “Infinite Scroll" behavior to an normal pagination:

:white_check_mark: **Pros**:
- This implementation has a lower potential to cause bugs (less frotend changes and also does not depends on user browser)
- Less development effort

:x:	**Cons**:
- Behavior change

:1234: **Estimated Story points**
- 3~5

:scroll: **Implementation needs:**

- Create the pagination component and replace infinite scroll with it
- Send the page param within the search request to backend

## Solution 2: Save the current search state

:white_check_mark: **Pros**:
- The user does not need to adapt to new behavior

:x:	**Cons**:
- Higher potential to introduce bugs
- Needs to take in account the disclaimers
- Many changes on frontend/backend and also in the ES query to search the listings

:1234: **Estimated Story points**
- 8~13

:scroll: **Implementation needs:**
- Create a PIT (point in time) before the first search request of an user
- Store the PIT (in redis for example) associating it to the user session for subsequent requests
    > Note: the PIT have an "keep_alive" attribute that is renewed after each subsequent request.
- When user are navigating over the search results, listen and store the scroll position (debounced)
- On the Search requests, we should check if there's any valid stored pit for the request session and if so, send it within the request to ES.
- If user is coming back from details page, check if there's any scroll position stored, if so, we must also request previous results within the actual pit and send the scroll position to frontend
- Update the stored pit after each request
- Add an unique key (like the "mls_id" property) to the sort attribute of the query (it's an ES requirement when using PIT's)