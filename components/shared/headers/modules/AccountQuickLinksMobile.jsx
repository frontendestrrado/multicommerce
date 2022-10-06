import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { logOut } from "../../../../store/auth/action";
import { Dropdown, Menu } from "antd";
class AccountQuickLinks extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(logOut());
  };

  render() {
    const accountLinks = [
      {
        text: "Account Information",
        url: "/account/user-information",
        icon: "icon-user",
      },
    ];
    const menu = (
      <Menu>
        {accountLinks.map((link, index) => (
          <Menu.Item key={index}>
            <Link href={link.url}>
              <a>
                <i className={link.icon}></i>
                <span className="m-4">{link.text}</span>
              </a>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item>
          <a href="#" onClick={this.handleLogout.bind(this)}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
        <a
          className="header__extra ps-user--mobile"
          onClick={(e) => e.preventDefault()}
        >
          <i className="icon-user"></i>
        </a>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
