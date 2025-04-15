import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import PageLayout from "./PageLayout";
import HomePage from "../pages/HomaPage";
import DetailPage from "../pages/DetailPage";
import AccountValidator from "./AccountValidator";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AccountValidator
              render={() => (
                <PageLayout>
                  <HomePage />
                </PageLayout>
              )}
            />
          }
        />
        <Route
          path="/contract/:id"
          element={
            <AccountValidator
              render={() => (
                <PageLayout>
                  <DetailPage />
                </PageLayout>
              )}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
