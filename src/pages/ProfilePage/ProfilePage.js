import React from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import ListContainer from '../../containers/ListContainer/ListContainer';

export default function ProfilePage(){

    return (
        <main>
            <section>
                <ProfileContainer />
            </section>
            <section>
                <ListContainer />
            </section>
        </main>
);
}

