import Link from "next/link";
const Component = () => (
  <div className="wrapper">
    <ul class="head-list">
      <li>HOME</li>
      <li>INVITE</li>
      <li>FEATURES</li>
      <li>
        <Link href="/udb">
          <a>LOGIN</a>
        </Link>
      </li>
    </ul>
    <style>
      {`
            @import url("https://fonts.googleapis.com/css?family=Montserrat");
.wrapper {
  background: gray;
}
.head-list {
  list-style: none;
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  color: white;
  text-decoration: none;
}
.head-list > li {
  margin-left: 10px;
  display: inline-block;
  text-align: right;
  margin-right: 15px;
  padding: 20px;
  text-decoration: none;
  transition: 800ms ease all;
}
.head-list > li:hover {
  /* background: #0d75cf; */
  background: black;
  cursor: pointer;
}

a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: white;
}

            `}
    </style>
  </div>
);

export default Component;
