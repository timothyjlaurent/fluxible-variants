'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Nav = React.createClass({
    getDefaultProps: function () {
        return {
            selected: 'variant',
            links: {}
        };
    },
    render: function() {
        var selected = this.props.selected;
        var links = this.props.links;

        var linkHTML = Object.keys(links).map(function (name) {
            var className = '';
            var link = links[name];

            if (selected === name) {
                className = 'pure-menu-selected';
            }

            return (
                <li className={className} key={link.path}>
                    <NavLink routeName={link.page}>{link.title}</NavLink>
                </li>
            );
        });

        return (
            <nav className="navbar">
                <ul className="nav nav-tabs">
                    {linkHTML}
                </ul>
            </nav>
        );
    }
});

module.exports = Nav;
