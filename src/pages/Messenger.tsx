import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  status: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface MessengerProps {
  user: { username: string; userId: number };
}

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    status: 'онлайн',
    lastMessage: 'Увидимся завтра!',
    time: '14:32',
    unread: 2,
    avatar: 'АС'
  },
  {
    id: 2,
    name: 'Дмитрий Петров',
    status: 'был(а) 5 мин назад',
    lastMessage: 'Отправил файлы',
    time: '13:15',
    avatar: 'ДП'
  },
  {
    id: 3,
    name: 'Екатерина Волкова',
    status: 'онлайн',
    lastMessage: 'Спасибо большое!',
    time: '12:48',
    unread: 1,
    avatar: 'ЕВ'
  },
  {
    id: 4,
    name: 'Алексей Иванов',
    status: 'был(а) 1 час назад',
    lastMessage: 'Созвонимся позже',
    time: '11:22',
    avatar: 'АИ'
  },
  {
    id: 5,
    name: 'Мария Соколова',
    status: 'онлайн',
    lastMessage: 'Договорились 👍',
    time: '10:05',
    avatar: 'МС'
  }
];

const initialMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', sent: false, time: '14:25' },
  { id: 2, text: 'Здорово! Всё отлично, спасибо 😊', sent: true, time: '14:26' },
  { id: 3, text: 'Завтра встречаемся?', sent: false, time: '14:30' },
  { id: 4, text: 'Да, конечно! В 15:00 устроит?', sent: true, time: '14:31' },
  { id: 5, text: 'Увидимся завтра!', sent: false, time: '14:32' }
];

export default function Messenger({ user }: MessengerProps) {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sent: true,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-full md:w-96 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SAIDUS
            </h1>
            <p className="text-xs text-muted-foreground">@{user.username}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <div className="p-3">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск контактов..." 
              className="pl-10 bg-card border-0"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedContact.id === contact.id ? 'bg-muted' : ''
              }`}
            >
              <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-medium">
                  {contact.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{contact.name}</h3>
                  <span className="text-xs text-muted-foreground">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  {contact.unread && (
                    <span className="ml-2 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full px-2 py-0.5 font-medium">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
              {selectedContact.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedContact.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedContact.status}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'} animate-slide-in`}
              >
                <div className={`message-bubble ${message.sent ? 'message-sent' : 'message-received'}`}>
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block ${message.sent ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              placeholder="Введите сообщение..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-card border-0"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              className="shrink-0 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
