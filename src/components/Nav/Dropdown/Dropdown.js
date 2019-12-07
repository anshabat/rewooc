import "./Dropdown.scss";
import React from "react";
import Nav from "../Nav";
import {Link} from "react-router-dom";
import Icon from "../../UI/Icon/Icon";
import {siteUrl} from "../../../shared/utilities";

const Dropdown = (props) => (
  <ul className={`rw-dropdown rw-dropdown--depth-${props.depth}`}>
    {props.items.map(item => (
      <li className="rw-dropdown__item"
          onMouseEnter={() => props.showItem(item)}
          onMouseLeave={() => props.hideItem(item)}
          key={item.ID}
      >
        <Link className="rw-dropdown__link" to={siteUrl(item.url)}>
          {item.title}
          {props.hasChildItems(item) ? (
            <Icon name="fa-angle-right" classes={["pc-dropdown__arrow"]}/>
          ) : null}
        </Link>
        {props.openedItems.includes(item.ID) ? (
          <div className="rw-dropdown__drop rw-dropdown__drop--ltr">
            <Nav parentId={item.ID} depth={props.depth + 1}/>
          </div>
        ) : null}
      </li>
    ))}
  </ul>
);

export default Dropdown;