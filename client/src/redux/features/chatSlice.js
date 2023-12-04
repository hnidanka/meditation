//redux chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const fetchUsers = createAsyncThunk(
  'chat/fetchUsers',
  async () =>
  {
    try
    {
      const { data } = await axios.get('/chat/users');
      return data;
    } catch (error)
    {
      console.error(error);
      throw error;
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId) =>
  {
    try
    {
      const { data } = await axios.get(`/message/${chatId}`);
      return data;
    } catch (error)
    {
      console.error(error);
      throw error;
    }
  }
);

export const fetchChats = createAsyncThunk(
  'chat',
  async () =>
  {
    try
    {
      const { data } = await axios.get(`/chat`);
      return data;
    } catch (error)
    {
      console.error(error);
      throw error;
    }
  }
);

const initialState = {
  messages: [],
  users: [],
  chats: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action)
    {
      state.messages.push(action.payload);
    },
    setMessages(state, action)
    {
      state.messages = action.payload;
    },
    addChat(state, action)
    {
      state.chats.push(action.payload)
    },
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(fetchUsers.pending, (state) =>
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMessages.pending, (state) =>
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChats.pending, (state) =>
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) =>
      {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) =>
      {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessage, setMessages, addChat } = chatSlice.actions;

export default chatSlice.reducer;