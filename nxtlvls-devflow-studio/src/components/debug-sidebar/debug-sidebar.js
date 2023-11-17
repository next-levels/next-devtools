import React, {useCallback, useEffect, useState} from 'react';
import { Box, Button, Layer, Tab, Tabs, Text, TextArea, FormField } from 'grommet';
import { FormClose, Configure, Terminal, Cube } from 'grommet-icons';
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {openSidebar, selectSelectedFlow, selectSelectedFlowConfig, updateConfig} from "../../flowSlice";
import debounce from 'lodash.debounce';

const socket = io("http://localhost:3010");

const DebugSidebar = (toggleSidebar) => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [context, setContext] = useState([]);
  const [results, setResults] = useState([]);
  const trigger = useSelector(openSidebar);
  const selectedFlow = useSelector(selectSelectedFlow);
  const selectedFlowConfig = useSelector(selectSelectedFlowConfig);
  const [params, setParams] = useState([]);
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    console.log('selectedFlow', selectedFlow)
    if (selectedFlow) {
      setParams(selectedFlow.params || []);
    }
  }, [selectedFlow]);

  useEffect(() => {
    if (selectedFlow && selectedFlow.config) {
      setFormValues(selectedFlow.config);
    }
  }, [selectedFlowConfig]);

  useEffect(() => {
    socket.on("result", (message) => {
      setResults((prevOutput) => [...prevOutput, message]);
    });
    socket.on("log", (message) => {
      console.log('log', message)
      setLogs((prevOutput) => [...prevOutput, message]);
    });
    socket.on("context", (message) => {
      setContext((prevOutput) => [...prevOutput, message]);
    });

  }, []);

  useEffect(() => {
    if (trigger) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [trigger]); // listen for changes to the trigger state


  const debouncedSave = debounce(async (param, value) => {
    console.log('debouncedSave', param, value)
    return dispatch(updateConfig({param, value}));
  }, 1500);


  return (
    <Box fill>
      {open && (
        <Layer position='right' full='vertical' modal={false} onClickOutside={() => setOpen(false)}>
          <Box
            fill='vertical'
            width='medium'
            background='light-2'
            align='start'
            justify='between'
          >
            <Box>
              <Button icon={<FormClose />} onClick={() => setOpen(false)} />
              <Tabs>
                <Tab title='Params' icon={<Configure />}>
                  <Box margin='medium' flex='grow' overflow='auto'>
                    <Text>Params</Text>
                    {params.map((param) => (
                      <FormField label={param}>
                        <TextArea
                          placeholder={`Enter ${param}`}
                          value={formValues[param] || ''}
                          onChange={event => {
                            const value = event.target.value;
                            setFormValues((prevValues) => ({...prevValues, [param]: value}));

                            debouncedSave(param, value);
                          }}
                        />
                      </FormField>
                    ))}
                  </Box>

                </Tab>
                <Tab title='Log' icon={<Terminal />}>
                  <Box margin='medium' flex='grow' overflow='auto'>
                    <Text>Terminal</Text>
                    <TextArea value={
                      logs.map((log) => `${log}\n`)
                    } />
                  </Box>
                </Tab>
                <Tab title='Result' icon={<Cube />}>
                  <Box margin='medium' flex='grow' overflow='auto'>
                    <Text>Artifacts</Text>
                    <TextArea value={
                      results.map((log) => `${log}\n`)
                    } />                  </Box>
                </Tab>
              </Tabs>
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default DebugSidebar;
