import './about.css';
import "../vendor/flickity.css";
import {githubUrl, githubUsername, githubRepository} from "../js/constants/Settings";
import GithubApi from "../js/modules/GithubApi";

const githubApi = new GithubApi(githubUrl,githubUsername,githubRepository);
githubApi.render();
