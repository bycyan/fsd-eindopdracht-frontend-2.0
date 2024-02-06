//GET: user/{userId} (data) =>
//Container: ProfileContainer <Section>, //Component(s): ImageComponent, ActionButton (Settings) =>
//Container: SettingsContainer <Section> //Component(s): TextInput, PasswordInput, EmailInput, SubmitButton
//PUT: user/{userId} (data)

import React from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import ListContainer from '../../containers/ListContainer/ListContainer';

export default function ProfilePage(){
    function showUserProjects(projectId) {
        console.log('Showing specific list:', projectId);
}

    return (
        <>
            <ProfileContainer />
            <ListContainer projectList={showUserProjects} />
        </>
);
}

