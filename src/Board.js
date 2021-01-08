import React, { Fragment } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { injectGlobal } from "styled-components";
import firebase from "firebase";

import {
  Random as RandomIcon,
  UserEdit as UserEditIcon,
  WindowClose as CloseIcon
} from "styled-icons/fa-solid";
import { DeleteSweep as ClearIcon } from "styled-icons/material";
import { Settings as SettingsIcon } from "styled-icons/feather/Settings";
import { LogOut as LogOutIcon } from "styled-icons/feather/LogOut";
import { CalendarTimes as CalendarOutIcon } from "styled-icons/fa-regular/CalendarTimes";

import Card from "./Card";
import Track from "./Track";
import Badges from "./Badges";
import ParkingLot from "./ParkingLot";
import ThemeButton from "./ThemeButton";

import { CalendarEnabled } from "./model/featureflags";

import {
  bs,
  fontSize,
  lineHeight,
  marginBottom,
  Controls,
  Control,
  Checklist,
  ChecklistItem,
  Check
} from "./common-styles";

injectGlobal`
  body {
    background: linear-gradient(to right, #00b4db, #0083b0);
    padding: 0px 0 40px 0;
    margin: 0;
    color: white;
  }
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: 5.48056% 1fr 22fr 10.96%;
  grid-template-areas:
    "settings settings settings settings"
    ". . peoplehdr ."
    ". peoplecontrols people ."
    ". . trackshdr ."
    ". trackcontrols tracks ."
    ". . parkinglothdr ."
    ". parkinglotcontrols parkinglot ."
    ". . contexthdr ."
    ". . context .";
`;

const PageControls = styled.div`
  position: absolute;
  top: ${bs(2)};
  right: ${bs(2)};
  display: grid;
  grid-template-rows: ${bs(2)} ${bs(2)};
`;

const LogOutButton = LogOutIcon.extend`
  width: ${bs(1)};
  height: ${bs(1)};
  cursor: pointer;
`;

const SettingsButton = SettingsIcon.extend`
  width: ${bs(1)};
  height: ${bs(1)};
  grid-row: 1;
  cursor: pointer;
`;

const Settings = styled.div`
  background: #313131;
  margin-bottom: ${bs(4)};
  padding: 0;
  transition: height 300ms cubic-bezier(0.42, 0, 0.58, 1);
  overflow: scroll;
`;

const ClearControl = ClearIcon.extend`
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: #fff;
  }
`;

const Heading = styled.h1`
  color: white;
  font-size: ${fontSize};
  line-height: ${lineHeight};
  margin-bottom: ${marginBottom};
`;

const CardsRow = styled.div`
  display: flex;
  align-items: center;
  margin: ${bs};
  flex-wrap: wrap;
`;

const CardsDivider = styled.div`
  border-left: 1px solid white;
  height: 80px;
  margin-left: 0px;
`;

const Shuffle = RandomIcon.extend`
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: #fc0;
  }
`;

const CalendarButton = CalendarOutIcon.extend`
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: #fc0;
  }
`;

const PeopleEdit = UserEditIcon.extend`
  color: rgba(255, 255, 255, 0.6);

  &:hover {
    color: #fff;
  }
`;

const HighlightInput = styled.input`
  background: none;
  border: none;
  text-align: center;
  color: white;
  height: 2em;
  font-size: 12pt;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TitleInput = HighlightInput.extend`
  font-size: 15pt;
`;

export default class Board extends React.Component {
  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.type === "BADGE") {
      this.props.onDropBadge(result.destination.droppableId.split("-")[1]);
    }

    if (result.type === "CARD") {
      this.props.onDropCard(
        result.draggableId,
        result.destination.droppableId,
        result.destination.index
      );
    }
  };

  toggleSettings = () => {
    this.setState(prevState => ({
      settingsOpen: !prevState.settingsOpen
    }));
  };

  toggleEditPeople = () => {
    this.setState(prevState => ({
      editingPeople: !prevState.editingPeople
    }));
  };

  constructor(props) {
    super(props);
    this.state = { settingsOpen: false, editingPeople: false };
  }

  logOut = () => {
      firebase.auth().signOut();
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Page className="App">
          <Settings
            style={{
              gridArea: "settings",
              height: this.state.settingsOpen ? bs(18) : 0
            }}
          >
            <PageControls>
              {!this.state.settingsOpen && (
              <LogOutButton title="log out" onClick={this.logOut} />
              )}
              <SettingsButton onClick={this.toggleSettings}>
                {this.state.settingsOpen ? <CloseIcon /> : <SettingsIcon />}
              </SettingsButton>
              {!this.state.settingsOpen && (
                <ThemeButton
                  theme={this.props.theme}
                  onSelectThemeColor={this.props.onSelectThemeColor}
                />
              )}
            </PageControls>
            <Checklist style={{ marginTop: bs(2) }}>
              <ChecklistItem>
                <Check /> <h3>Custom Background Colour (Coming Soon)</h3>
              </ChecklistItem>
              <ChecklistItem>
                <Check /> <h3> Show CI Pair Badge (Coming Soon) </h3>
              </ChecklistItem>
              <ChecklistItem>
                <Check /> <h3> Show Suggested Pairs (Coming Soon) </h3>
              </ChecklistItem>
              <ChecklistItem>
                <Check />{" "}
                <h3> Show Track Num-days-running Counter (Coming Soon) </h3>
              </ChecklistItem>
            </Checklist>
          </Settings>
          <Controls style={{ gridArea: "peoplecontrols" }}>
            <Control onClick={this.toggleEditPeople}>
              {this.state.editingPeople ? (
                <CloseIcon style={{ color: "#fff" }} />
              ) : (
                <PeopleEdit />
              )}
            </Control>
          </Controls>
          <Controls style={{ gridArea: "trackcontrols" }}>
            <Control>
              <Shuffle onClick={this.props.onShuffle} />
              {CalendarEnabled && <CalendarButton />}
            </Control>
          </Controls>
          <Heading style={{ gridArea: "peoplehdr" }}>Team</Heading>
          <CardsRow style={{ gridArea: "people" }}>
            <Track
              dragEnabled={!this.state.editingPeople}
              title="Unassigned"
              dropId="available"
              minCards={1}
              showAddButton={this.state.editingPeople}
              onAddCard={this.props.onAddCard}
            >
              {((this.props.assignments || {})["available"] || []).map(id => (
                <Card
                  key={id}
                  photo={this.props.avatars[id]}
                  dragId={id.toString()}
                  name={this.props.people[id]}
                  onNameUpdated={e => this.props.onNameUpdated(e, id)}
                  onGithubUpdated={e => this.props.onGithubUpdated(e, id)}
                  onRemoveCard={() => this.props.onRemoveCard(id)}
                  editMode={this.state.editingPeople}
                />
              ))}
            </Track>
            <CardsDivider />
            <Track
              dragEnabled={!this.state.editingPeople}
              title="Out"
              dropId="out"
              minCards={1}
            >
              {((this.props.assignments || {})["out"] || []).map(id => (
                <Card
                  key={id}
                  dragId={id.toString()}
                  name={this.props.people[id]}
                  photo={this.props.avatars[id]}
                  onNameUpdated={e => this.props.onNameUpdated(e, id)}
                  onGithubUpdated={e => this.props.onGithubUpdated(e, id)}
                  onRemoveCard={() => this.props.onRemoveCard(id)}
                  editMode={this.state.editingPeople}
                  ghost
                />
              ))}
            </Track>
          </CardsRow>
          <Heading style={{ gridArea: "trackshdr" }}>Pairs</Heading>
          <CardsRow style={{ gridArea: "tracks" }}>
            {(this.props.tracks || []).map((name, i) => (
              <Fragment key={i}>
                {i > 0 && <CardsDivider />}
                <Track
                  dropId={"track-" + i}
                  dragEnabled={!this.state.editingPeople}
                  title={
                    <TitleInput
                      type="text"
                      onChange={e => this.props.onUpdateTrackTitle(e, i)}
                      value={name}
                    />
                  }
                  onToggleLocked={this.props.onToggleLocked}
                  badges={
                    !this.state.editingPeople && (
                      <Badges
                        dropId={"track-" + i}
                        badges={this.props.badges[i]}
                        onToggleBadgeLocked={this.props.onToggleBadgeLocked}
                        lockedBadges={this.props.lockedBadges}
                      />
                    )
                  }
                >
                  {(this.props.assignments["track-" + i] || []).map(id => (
                    <Card
                      key={id}
                      dragId={id.toString()}
                      name={this.props.people[id]}
                      photo={this.props.avatars[id]}
                      onNameUpdated={e => this.props.onNameUpdated(e, id)}
                      onGithubUpdated={e => this.props.onGithubUpdated(e, id)}
                      onRemoveCard={() => this.props.onRemoveCard(id)}
                      editMode={this.state.editingPeople}
                      locked={this.props.locked[id]}
                      shuffling={this.props.shuffling}
                    />
                  ))}
                </Track>
              </Fragment>
            ))}
          </CardsRow>
          <Heading style={{ gridArea: "parkinglothdr" }}>Parking Lot</Heading>
          <Controls style={{ gridArea: "parkinglotcontrols" }}>
            <Control>
              <ClearControl onClick={this.props.onCleanParkingLot} />
            </Control>
          </Controls>
          <ParkingLot
            items={this.props.parkingLotItems}
            onCheck={this.props.onParkingLotItemChecked}
            onUpdate={this.props.onParkingLotItemUpdated}
          />
        </Page>
      </DragDropContext>
    );
  }
}
