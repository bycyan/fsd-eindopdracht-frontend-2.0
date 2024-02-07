//GET: user/{userId} (data) =>
//Container: ProfileContainer <Section>, //Component(s): ImageComponent, ActionButton (Settings) =>
//Container: SettingsContainer <Section> //Component(s): TextInput, PasswordInput, EmailInput, SubmitButton
//PUT: user/{userId} (data)

import React from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import ListContainer from '../../containers/ListContainer/ListContainer';
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import logo from "../../assets/soundwwise-logo.png";

export default function ProfilePage(){
    // function showListOfUserProjects(projectList) {
    //     console.log('Showing specific list:', projectList);
    // }

    return (
        <main>
            <section>
                <ProfileContainer />
            </section>
        </main>
);
}

