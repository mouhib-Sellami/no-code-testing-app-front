import { Accordion, ActionIcon, Group, SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import TestComponent from "./TestComponent";
import useProjects from "@/hooks/useProjects";
import { TestCase } from "@/types/models/TestCase";
import { IconPlus, IconTestPipe2Filled } from "@tabler/icons-react";

export interface ProviderComponentSelectorProps { }
interface testCasesType {
    TEST_CASE: Array<TestCase>,
    PRECONDITION: Array<TestCase>
}
const TestSelectorSideBar: React.FC<ProviderComponentSelectorProps> = ({ }) => {
    const { projectTests, selectedProject } = useProjects();
    const { colors } = useMantineTheme();

    const testCases: testCasesType = React.useMemo(() => {
        let testCases_ = {
            "TEST_CASE": [],
            "PRECONDITION": []
        }
        if (!projectTests) return testCases_;
        projectTests.map(elm => {
            console.log(elm);

            testCases_[elm.type].push(elm)
        });
        return testCases_
    }, [projectTests]);

    const items = Object.entries(testCases).map(([key, values], idx) => {
        console.log(key);

        return (<Accordion.Item key={idx} value={key.toString()}>
            <Accordion.Control
                style={{
                    borderRadius: 8,
                    '&:hover': {
                        backgroundColor: colors.activeLinkBgColor[9],
                    },
                }}
                my={5}
            >
                <Text maw={"70%"} truncate="end" size="sm">
                    {key}
                </Text>

            </Accordion.Control>
            <Accordion.Panel>
                <SimpleGrid cols={2}>
                    {values.map((elm, idx) => (
                        <TestComponent key={idx} testCase={elm} />
                    ))}
                </SimpleGrid>
            </Accordion.Panel>
        </Accordion.Item>)
    });

    return (
        <>
            <Group align="center" justify="space-between" w={"100%"} pb={"md"} p={"md"}>
                <Title order={4}>
                    {selectedProject.name}
                </Title>
                <ActionIcon
                    variant="filled"
                    radius="md"
                    color={colors.activeLinkBgColor[9]}
                    title="Run Project"
                    size={30}
                >
                    <IconTestPipe2Filled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Group>
            <Accordion
                styles={{

                    item: {
                        border: 'none',
                        '&:not(:last-child)': {
                            borderBottom: `1px solid ${colors.activeLinkBgColor[2]}`,
                        },
                    },
                    control: {
                        '&:hover': {
                            backgroundColor: colors.activeLinkBgColor[0],
                        },
                    },
                }}
            >
                {items}
            </Accordion>
        </>
    );
};

export default TestSelectorSideBar;