class EventsController < ApplicationController

    def events
        user = current_user
        events = Event.where(field_id: params[:id])
        processed = events.map { |event|
            is_mine = (user != nil) && (user.id == event.user_id || user.is_admin)
            title = is_mine ? event.code : 'RESERVADO'
            {
                title: title,
                start: event.start,
                end: event.end,
                isMine: is_mine
            }
        }
        render :json => processed.to_json()
    end

end
