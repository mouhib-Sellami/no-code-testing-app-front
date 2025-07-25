

import { Box, Center, FloatingIndicator, Tabs } from '@mantine/core';
import React from 'react'
import classes from './style.module.css';
import WorkFlowsTab from './WorkFlowsTab';
import CasesTab from './CasesTab';
import { WorkFlowContext } from '@/contexts/WorkflowContext';

const WorkFlowSideBar: React.FC = () => {
    const [rootRef, setRootRef] = React.useState<HTMLDivElement | null>(null);
    const { value, updateActiveTab } = React.useContext(WorkFlowContext);
    const [controlsRefs, setControlsRefs] = React.useState<Record<string, HTMLButtonElement | null>>({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };

    return (
        <Tabs variant="none" value={value} onChange={updateActiveTab}>
            <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
                    Work flows
                </Tabs.Tab>
                <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
                    Cases
                </Tabs.Tab>
                <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
                    Atomic Test
                </Tabs.Tab>

                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Tabs.List>

            <Tabs.Panel value="1"><WorkFlowsTab active={value == "1"} /></Tabs.Panel>
            <Tabs.Panel value="2"><CasesTab active={value == "2"} /></Tabs.Panel>
            <Tabs.Panel value="3"><Box h={"100%"} w={"100%"}>
                <Center w={"100%"} h={"100%"}>
                    comming soon
                </Center>
            </Box></Tabs.Panel>
        </Tabs>
    )
}

export default WorkFlowSideBar;