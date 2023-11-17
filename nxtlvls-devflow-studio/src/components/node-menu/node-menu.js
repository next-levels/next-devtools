import {Box, Button, Heading, Text} from "grommet";
import { Close } from 'grommet-icons';

const DropContent = ({ onClose,id,logs }) => (
  <Box pad="small">
    <Box direction="row" justify="between" align="center">
      <Heading level={5} margin="small">
        {id}
      </Heading>
      <Button icon={<Close />} onClick={onClose} />
    </Box>
    <Text size="xsmall">
      {logs.map((log) => `${log}\n`)}
    </Text>
  </Box>
);

export default DropContent;
