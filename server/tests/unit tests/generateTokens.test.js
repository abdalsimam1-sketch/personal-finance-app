import { describe,test,expect } from "vitest";
import {generateTokens} from "../../src/utils/generateTokens"


const testsuer = {
    id:"1",
    email:"testuser@gmail.com"
}

describe("generate tokens",()=>{
    test("generates access and refresh tokens",()=>{
        const {accessToken,refreshToken}=generateTokens({id:testsuer.id,email:testsuer.email});
        
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
        expect(accessToken).not.toEqual(refreshToken)

    })
})