import React, { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Message from "../models/message";
import ScrollableFeed from "react-scrollable-feed";

interface Props {
  classes: any;
  sendMessage: Function;
  messages: Message[];
  username: string;
}

interface State {
  message: string;
}

class Chat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.currentTarget.value });
  };

  enterPressed = (event: React.KeyboardEvent) => {
    event.preventDefault();
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.state.message) {
        this.props.sendMessage(this.state.message);
      }
      this.setState({ message: "" });
    }
  };

  renderChat = (classes: any) => {
    const chat = [];
    let count = 0;
    const setUser = (message: Message) => {
      if (message.user) {
        return message.user + ":";
      } else {
        return "";
      }
    };

    for (const m of this.props.messages) {
      chat.push(
        <span>
          <ListItemText
            className={classes.message}
            key={count}
            primary={
              <span>
                <div style={{ paddingLeft: 16 }}>
                  <span className={classes.userMessageLabel}>{setUser(m)}</span>
                  {" " + m.message}
                </div>
              </span>
            }
          />
        </span>
      );
      count++;
    }
    if (this.props.messages.length) {
      return <List>{chat}</List>;
    } else {
      return "";
    }
  };

  render() {
    const { classes } = this.props;
    const chatField = (
      <div className={classes.footer}>
        <TextField
          // className={classes.chatbox}
          multiline
          rowsMax="5"
          fullWidth={true}
          InputProps={{ className: classes.textField }}
          InputLabelProps={{ className: `${classes.textField} ${classes.userInputLabel}` }}
          label={this.props.username + ":"}
          placeholder="Type your message..."
          onChange={this.onChange}
          onKeyUp={this.enterPressed}
          value={this.state.message}
          variant="filled"
        />
      </div>
    );

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Card className={classes.chatContainer}>
          <CardHeader
            classes={{
              title: classes.chatHeader
            }}
            title="CHAT"
          />
          <ScrollableFeed forceScroll className={classes.messages}>
            {this.renderChat(classes)}
          </ScrollableFeed>
          {chatField}
        </Card>
      </div>
    );
  }
}

const materialUiStyles = createStyles({
  chatbox: {
    color: "white"
  },
  textField: {
    "& input + fieldset": {
      "&::placeholder": {
        color: "white"
      },
      borderWidth: 2
    },
    color: "white"
  },
  message: {
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.9)"
  },
  messages: {
    overflowX: "auto",
    overflowWrap: "break-word",
    height: "60%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,.1)",
      outline: "1px solid slategrey",
      borderRadius: 3
    }
  },
  userMessageLabel: {
    paddingRight: 10,
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.8)"
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%"
  },
  userInputLabel: {
    position: "relative",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 20,
    color: "rgba(98, 239, 249, 0.8)",
    paddingRight: 15
  },
  chatContainer: {
    position: "relative",
    height: "42vh",
    overflow: "auto",
    background: "rgba(255, 255, 255, 0.05)"
  },
  chatHeader: {
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.4)",
    maxHeight: 15
  }
});

export default withStyles(materialUiStyles)(Chat);
