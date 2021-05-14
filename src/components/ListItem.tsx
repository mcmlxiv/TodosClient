import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Tooltip,
  CardActions,
  CardContent,
  CardHeader,
  Card,
  Typography,
} from "@material-ui/core";

import { listProps } from "../types.model";
import moment from "moment";
import clsx from "clsx";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SaveIcon from "@material-ui/icons/Save";
import { CrudHandlingTodo } from "../hooks/CrudContext";

//Passing All list props to render
const ListItem: React.FC<listProps> = ({
  id,
  date,
  todoTitle,
  todoText,
  todoChange,
  todosActive,
  todosPin,
  onUpdateTodo,
  onDeleteTodo,
  onStatusUpdate,
  onPinStatus,
}) => {
  //ContentEditable handling
  //To track and allow for live updating of Title and text field
  const text = useRef("");

  //to update the new date when update is clicked
  const updatedDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  //to store the values of text and title when used using ContentEditable
  const handleText = (e: { target: { value: string } }) => {
    text.current = e.target.value;
  };

  //to do styling using Material UI hook
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      border: 0,
      borderRadius: 10,
      background: " rgba( 255, 255, 255, 0.25 )",
      boxShadow: "0 8px 12px 0 rgba( 0, 0, 0, 0.37 )",
      backdropFilter: "blur( 2px )",
      height: "100%",
      padding: "0 2.5rem",
      maxWidth: "22rem",
      minWidth: "22rem",
      margin: "0.5rem",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        width: "30vw",
        padding: "0 1rem",
        maxWidth: "75vw",
        minWidth: "75vw",
      },
    },
    note: {
      paddingTop: "0.5rem",
    },
    cardCase: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
    },
    cardText: {
      fontSize: "1.15rem",
      textDecoration: `${!todosActive ? "line-through" : "none"}`,
    },
    grid: {
      gridRowEnd: "span 2",
    },
    menuButton: {
      display: "block",
      marginRight: 0,
      padding: "1.5rem 3rem",

      [theme.breakpoints.down("md")]: {
        display: "block",
      },
    },
    menuButtonDiv: {
      display: "flex",
      alignSelf: "center",
      marginTop: 0,
      padding: 0,
    },
    hide: {
      display: "none",
    },
    content: {
      display: `${open ? "none" : "flex"}`,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 0,
      paddingTop: "1.5rem",
      paddingLeft: "1rem",
      margin: 0,
    },
    helpMsg: {
      margin: 0,
      padding: 0,
      paddingRight: "1rem",
    },
  }));

  //State for opening of ToolBar on phone display sizes
  const [open, setOpen] = React.useState<boolean>(true);
  const handleDrawerOpen = () => {
    //when drawer is closed setOpen set to false and drawer open SetOpen is true
    setOpen(!open);
  };
  const { language } = React.useContext(CrudHandlingTodo);
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.grid}
    >
      <Card key={id} elevation={3} className={classes.root}>
        <CardHeader
          action={
            <CardActions>
              <Tooltip
                title={`${
                  language
                    ? `${todosPin ? "Remove Pin!" : "Pin It!"}`
                    : `${todosPin ? "清除 銷子!" : "牽制 它!"}`
                }`}
                arrow
              >
                <IconButton
                  //Pin current to do
                  onClick={onPinStatus?.bind(null, id, text, updatedDate)}
                  aria-label="Pin"
                  style={{ padding: 4 }}
                >
                  {todosPin ? <CallReceivedIcon /> : <CallMadeIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip
                title={`${language ? "Update Todo" : "更新 Todo"}`}
                arrow
              >
                <IconButton
                  style={{ padding: 4 }}
                  aria-label="Update Todo"
                  onClick={onUpdateTodo.bind(
                    null,
                    id,
                    text,
                    updatedDate
                    //update button component bound with Id text and updated Date
                  )}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`${language ? "Delete" : "刪除"}`} arrow>
                <IconButton
                  //Delete current To do button
                  style={{ padding: 4 }}
                  aria-label={`${language ? "Delete" : "刪除"}`}
                  onClick={onDeleteTodo.bind(null, id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          }
          title={
            <Tooltip title={todoTitle} arrow>
              <Typography
                variant="h6"
                component={"p"}
                color={"textSecondary"}
                noWrap={open}
                style={{ maxWidth: "8rem" }}
              >
                {todoTitle}
              </Typography>
            </Tooltip>
          }
        />
        <CardContent
          className={clsx(classes.content, {
            [classes.hide]: open,
          })}
        >
          <Typography
            variant="body2"
            component={"span"}
            color={"textSecondary"}
          >
            <ContentEditable
              //To allow for the content of the To do to be live edited
              //Disabled if set to !todosActive
              html={todoText}
              onChange={handleText}
              disabled={!todosActive}
              className={classes.cardText}
            />
          </Typography>
          {/*Only show status toggle if the todos isn't pinned*/}
          {!todosPin && (
            <CardActions style={{ margin: 0, padding: 0 }}>
              <Tooltip
                title={`${language ? "Todo Status" : "Todo 狀態"}`}
                arrow
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      //Checkbox to toggle to do active state
                      checked={!todosActive}
                      onClick={onStatusUpdate?.bind(
                        null,
                        id,
                        text,
                        updatedDate
                      )}
                      name="check"
                      color="primary"
                      aria-label={`${language ? "Todo Status" : "Todo 狀態"}`}
                    />
                  }
                  label={`${
                    language
                      ? `${todosActive ? "Done?" : "Finished!"}`
                      : `${todosActive ? "完畢?" : "完成的？"}`
                  }`}
                />
              </Tooltip>
            </CardActions>
          )}
          <CardContent>
            <Typography
              //To display to do creation and/or edited time stamps
              id={"Date"}
              variant="body2"
              color={"textSecondary"}
              paragraph={true}
              align={"center"}
              component={"div"}
              className={classes.helpMsg}
            >
              {language ? todoChange : "在編輯: "} {date}
              {todosActive && (
                <Typography
                  variant="body2"
                  color={"textSecondary"}
                  paragraph={true}
                  align={"center"}
                  className={classes.note}
                >
                  &#42;
                  {language ? "Click the text to edit" : "點擊文字進行編輯"}
                  <br />
                  &#42;
                  {language
                    ? "Then click update to save the edit"
                    : " 然後點擊更新以保存修改”"}
                </Typography>
              )}
            </Typography>
          </CardContent>
        </CardContent>
        <div className={classes.menuButtonDiv}>
          <Tooltip title={`${language ? "Show Todo" : "表演 Todo"}`}>
            <IconButton
              color="inherit"
              aria-label={`${language ? "Open drawer" : "打開抽屜"}`}
              onClick={handleDrawerOpen}
              edge="start"
              //clsx constructing classname conditional
              className={clsx(classes.menuButton, {
                [classes.hide]: !open,
              })}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={`${language ? "Hide Todo" : "隱藏 Todo"}`}>
            <IconButton
              color="inherit"
              aria-label={`${language ? "Close drawer" : "關閉抽屜"}`}
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <ExpandLessIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Card>
    </Grid>
  );
};

export default ListItem;
