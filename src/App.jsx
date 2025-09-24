import Header from "./components/Header";
import Main from "./components/Main";
import chefClaudeLogo from "./images/chef-claude-icon.png";

export default function App() {
  return (
    <>
      <Header title="Chef Claude" logoSrc={chefClaudeLogo} />
      <Main />
    </>
  );
}
