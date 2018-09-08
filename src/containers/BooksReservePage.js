import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class BooksReservePage extends Component {

    render() {

        let today = new Date();
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        return (
            <div className='MainContent'>
                <h1>
                    BooksReservePage (En Mantenimiento)
                </h1>
                <div>
                    <InfiniteCalendar
                        width={1300}
                        height={600}
                        selected={today}
                        disabledDays={[0,6]}
                        minDate={lastWeek}
                    />,
                </div>
            </div>
        );
    }
}

export default BooksReservePage;