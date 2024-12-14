import { Provider } from "react-redux"

import { store } from "."

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

export default StoreProvider
