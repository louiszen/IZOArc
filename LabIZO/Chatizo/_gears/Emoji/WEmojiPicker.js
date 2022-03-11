import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";

import * as unicodeEmoji from "unicode-emoji";
import _ from "lodash";
import { EmojiEmotions, EmojiEvents, EmojiFlags, EmojiFoodBeverage, EmojiNature, EmojiObjects, EmojiPeople, EmojiSymbols, EmojiTransportation } from "@mui/icons-material";
import { Box } from "@mui/system";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";
import { ButtonBase, IconButton, Typography } from "@mui/material";

/**
 * @augments {Component<Props, State>}
 */
class WEmojiPicker extends Component {

  static propTypes = {
    theme: PropsType.string,
    onEmojiClick: PropsType.func,
    version: PropsType.number,
    catIcons: PropsType.object,
  }

  static defaultProps = {
    onEmojiClick: () => {},
    version: 11,
    catIcons: {
      "smileys-emotion": <EmojiEmotions fontSize="10"/>,
      "people-body": <EmojiPeople fontSize="10"/>,
      "animals-nature": <EmojiNature fontSize="10"/>,
      "food-drinks": <EmojiFoodBeverage fontSize="10"/>,
      "activities": <EmojiEvents fontSize="10"/>,
      "objects": <EmojiObjects fontSize="10"/>,
      "symbols": <EmojiSymbols fontSize="10"/>,
      "travel-places": <EmojiTransportation fontSize="10"/>,
      "flags": <EmojiFlags fontSize="10"/>
    }
  }

  constructor(){
    super();
    this.state = {
      selectedCat: "smileys-emotion",
      emojis: {}
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      this._loadEmoji();
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WEmojiPicker.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  _selectEmoji = (emoji) => {
    let {onEmojiClick} = this.props;
    if(onEmojiClick) onEmojiClick(emoji);
  }

  _loadEmoji = () => {
    let {version} = this.props;
    let emojis = unicodeEmoji.getEmojis();
    let grouped = {};
    _.map(emojis, (o, i) => {
      let v = Number(o.version);
      if(!_.isNaN(v) && v <= version){
        grouped[o.group] = grouped[o.group] || [];
        grouped[o.group].push(o.emoji);
      }
    });

    this.setState({
      emojis: grouped
    });
  }

  toCat = (cat) => {
    this.setState({
      selectedCat: cat
    });
  }

  renderCatBtn(cat, icon){
    let {theme} = this.props;
    let {selectedCat} = this.state;
    return (
      <IconButton key={cat} className={theme + " chatizo-emojipicker-catbtn" + (cat === selectedCat? " in": "")}
        onClick={() => this.toCat(cat)} size={"small"}>
        {icon}
      </IconButton>
    );
  } 

  renderCategory(){
    let {theme, catIcons} = this.props;
    return(
      <HStack className={theme + " chatizo-emojipicker-cat"} spacing={5}>
        {_.map(catIcons, (o, i) => {
          return this.renderCatBtn(i, o);
        })}
      </HStack>
    );
  }

  renderEmoji(emoji){
    let {theme} = this.props;
    return (
      <ButtonBase key={emoji} className={theme + " chatizo-emojipicker-emojibtn"}
        onClick={() => this._selectEmoji(emoji)} size={"small"}>
          <Typography>
            {emoji}
          </Typography>
      </ButtonBase>
    );
  }

  renderSelect(){
    let {theme} = this.props;
    let {emojis, selectedCat} = this.state;
    let selectedCatEmoji = emojis[selectedCat] || [];
    return (
      <Box className={theme + " chatizo-emojipicker-select"}>
        {_.map(selectedCatEmoji, (o, i) => this.renderEmoji(o))}
      </Box>
    );
  }

  render(){
    let {theme} = this.props;
    return (
      <VStack height="fit-content" className={theme + " chatizo-emojipicker"}>
        {this.renderCategory()}
        {this.renderSelect()}
      </VStack>
    );
  }

}

export default WEmojiPicker;
