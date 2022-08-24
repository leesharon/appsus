import { EmailApp } from "./email-app.jsx"
import { EmailDetails } from "./email-details.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class EmailIndex extends React.Component {
    render() {
        return <Router>
            <section className="email-index main-layout">
                <Switch>
                    <Route path="/mail/details" component={EmailDetails} />
                    <Route path="/mail" component={EmailApp} />
                </Switch>
            </section>
        </Router>
    }
}
