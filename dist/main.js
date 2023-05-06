"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const core = __importStar(require("@actions/core"));
// debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
const axios_1 = __importDefault(require("axios"));
const sendMsgToWeChat = (botKey, props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, axios_1.default)({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${botKey}`,
            data: props
        });
    }
    catch (error) {
        if (error instanceof Error)
            core.setFailed(error.message);
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const botKey = core.getInput('botKey');
            const content = core.getInput('content');
            const msgtype = core.getInput('msgtype') || 'markdown';
            const markdown = core.getInput('markdown');
            const mentionedMobileList = (core.getInput('mentionedMobileList') || '').split(',');
            core.debug(`botKey:${botKey}`);
            core.debug(`content:${content}`);
            core.debug(`msgtype:${msgtype}`);
            core.debug(`markdown:${markdown}`);
            core.debug(`mentionedMobileList:${mentionedMobileList}`);
            const props = {
                msgtype,
                markdown,
            };
            if (msgtype === 'text') {
                props.text = {
                    content,
                    mentioned_mobile_list: mentionedMobileList
                };
            }
            yield sendMsgToWeChat(botKey, props);
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
