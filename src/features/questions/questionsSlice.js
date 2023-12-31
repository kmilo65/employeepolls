import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { _getQuestions } from "../data/_DATA";

const questionsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
});

const initialState = questionsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await _getQuestions();
    return response.data;
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    allQuest: (state, payload) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        const loadedQuestions = action.payload.map((question) => {
          return question;
        });
        // Add any fetched question to the array
        questionsAdapter.upsertMany(state, loadedQuestions);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
  // Pass in a selector that returns the posts slice of state
} = questionsAdapter.getSelectors((state) => state.questions);

export const getQuestionsStatus = (state) => state.questions.status;
export const getQuestionsError = (state) => state.questions.error;

export const { allQuest } = questionsSlice.actions;

export default questionsSlice.reducer;
