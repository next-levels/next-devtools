import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  flows: [],
  selectedFlow: null,
  loading: false,
  error: null,
  openSidebar: false,
  saveFlow: false,
};

export const fetchFlows = createAsyncThunk('flows/fetchFlows', async () => {
  const response = await fetch('http://localhost:3010/flows');
  const jsonFiles = await response.json();
  jsonFiles.forEach((file, index) => {
    jsonFiles[index] = file.replace('.json', '');
  });
  return jsonFiles;
});

export const loadFlow = createAsyncThunk(
  'flows/loadFlow',
  async (flowName, { dispatch }) => {
    const response = await fetch(
      `http://localhost:3010/flows/${flowName}.json`
    );
    const flowData = await response.json();
    localStorage.setItem('lastSelectedFlow', flowName);
    return flowData;
  }
);

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setFlows: (state, action) => {
      state.flows = action.payload;
    },
    addFlow: (state, action) => {
      state.flows.push(action.payload);
    },
    selectFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
    updateNode: (state, action) => {
      const { id, data } = action.payload;
      const node = state.selectedFlow.flowData.nodes.find((node) => node.id === id);

       if (node) {
        console.log(node)
        console.log(id)

        node.data = { ...node.data, ...data };
         console.log(node.data)

         state.selectedFlow = JSON.parse(JSON.stringify(state.selectedFlow));
       }
    },
    updateSelectedFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
    updateConfig: (state, action) => {
      const { param, value } = action.payload;
      if (state.selectedFlow) {
        if (!state.selectedFlow.config) {
          state.selectedFlow.config = {}; // Initialize config if it doesn't exist
        }
        console.log(action.payload)

        state.selectedFlow.config[param] = value;
        console.log(state.selectedFlow.config)
        state.selectedFlow = JSON.parse(JSON.stringify(state.selectedFlow));
        console.log(state.selectedFlow.config)

      }
    },
    triggerOpenSidebar: (state) => {
       state.openSidebar = !state.openSidebar;
    },
    triggerSaveFlow: (state) => {
       state.saveFlow = !state.saveFlow;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlows.fulfilled, (state, action) => {
        state.loading = false;
        state.flows = action.payload; // payload is the array of flows
      })
      .addCase(fetchFlows.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
      .addCase(loadFlow.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFlow = action.payload;
      })
      .addCase(loadFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      });
  },
});

export const { setFlows, addFlow, selectFlow,updateSelectedFlow,updateNode,triggerOpenSidebar,updateConfig,triggerSaveFlow } = flowSlice.actions;
export const selectFlows = (state) => state.flow.flows;
export const selectSelectedFlow = (state) => state.flow.selectedFlow;
export const selectSelectedFlowConfig = (state) =>  state.flow.selectedFlow ? state.flow.selectedFlow.config:[];
export const openSidebar = (state) => state.flow && state.flow.openSidebar ? state.flow.openSidebar : false;
export const saveFlow = (state) => state.flow && state.flow.saveFlow ? state.flow.saveFlow : false;
export const { reducer: flowReducer } = flowSlice;
export const { actions } = flowSlice;
export default flowSlice.reducer;
