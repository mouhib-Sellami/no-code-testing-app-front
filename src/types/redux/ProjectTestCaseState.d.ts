import { ProjectComponent } from "../models/ProjectComponent";
import { TestCase } from "../models/TestCase";

interface ProjectTestCaseState extends BaseState {
    components: Array<ProjectComponent>,
    selectedTest: TestCase | null
}