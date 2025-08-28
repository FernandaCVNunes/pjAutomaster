import React, { useEffect, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(async (start, end) => {
    const qs = `?start=${start.toISOString()}&end=${end.toISOString()}`;
    const { data } = await api.get(`/api/events${qs}`);
    setEvents(data);
  }, []);

  useEffect(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    fetchEvents(start, end);
  }, [fetchEvents]);

  const handleDatesSet = (arg) => {
    fetchEvents(arg.start, arg.end);
  };

  const handleSelect = async (info) => {
    const title = window.prompt('Título do agendamento:');
    if (!title) return;
    const body = {
      title,
      start: info.startStr,
      end: info.endStr
    };
    try {
      const { data } = await api.post('/api/events', body);
      setEvents((prev) => [...prev, data]);
    } catch (err) {
      alert(err?.response?.data?.error || 'Erro ao criar evento');
    }
  };

  const handleEventResize = async ({ event }) => {
    try {
      await api.put(`/api/events/${event.id}`, {
        start: event.start.toISOString(),
        end: event.end.toISOString()
      });
    } catch (err) {
      alert('Erro ao atualizar evento');
    }
  };

  const handleEventDrop = async ({ event }) => {
    try {
      await api.put(`/api/events/${event.id}`, {
        start: event.start.toISOString(),
        end: event.end.toISOString()
      });
    } catch (err) {
      alert('Erro ao mover evento');
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      locale="pt-br"
      selectable={true}
      editable={true}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      datesSet={handleDatesSet}
      select={handleSelect}
      eventResize={handleEventResize}
      eventDrop={handleEventDrop}
    />
  );
}
