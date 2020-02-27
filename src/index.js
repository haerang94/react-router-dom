import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  useParams
} from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

var contents = [
  { id: 1, title: "html", description: "html is..." },
  { id: 2, title: "js", description: "js is..." },
  { id: 3, title: "React", description: "react is..." }
];

function Topic() {
  var params = useParams();
  console.log("params", params, params.topic_id);
  var topic_id = params.topic_id;
  var selected_topic = {
    title: "sorry",
    description: "Not Found"
  };
  for (var i = 0; i < contents.length; i++) {
    if (contents[i].id === Number(topic_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}

function Topics() {
  var lis = [];
  for (var i = 0; i < contents.length; i++) {
    lis.push(
      <li key={contents[i].id}>
        <NavLink to={"/topics/" + contents[i].id}>{contents[i].title}</NavLink>
      </li>
    );
  }

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
        {/* <li>
          <NavLink to="/topics/1">HTML</NavLink>
        </li>
        <li>
          <NavLink to="/topics/2">JS</NavLink>
        </li>
        <li>
          <NavLink to="/topics/3">React</NavLink>
        </li> */}
      </ul>
      <Route path="/topics/:topic_id">
        <Topic></Topic>
      </Route>

      {/* <Switch>
        <Route path="topics/1">HTML is ...</Route>
        <Route path="topics/2">JS is ...</Route>
        <Route path="topics/3">React is ...</Route>
      </Switch> */}
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Hello React Router DOM</h1>
      <ul>
        {/* a태그를 쓰면 페이지가 매번 리로딩 되지만 Link를 쓰면 새로 리로딩하는 일 없이 페이지를 변경 가능하다  */}
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/topics">Topics</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contacts</NavLink>
        </li>
      </ul>

      {/* switch를 쓸 경우 일치하는 가장 먼저 하나만 라우팅한다 */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/topics">
          <Topics></Topics>
        </Route>
        <Route path="/contact">
          <Contact></Contact>
        </Route>
        <Route path="/">Not Found</Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
