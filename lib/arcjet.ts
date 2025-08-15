import arcjet, {detectBot,fixedWindow,protectSignup,sensitiveInfo,slidingWindow,shield} from "@arcjet/next"

export {detectBot,fixedWindow,protectSignup,sensitiveInfo,slidingWindow,shield}
const ARCJET_KEY="ajkey_01k2k0ycs5e3485wc344b3e87y"

export default arcjet ({
    key:ARCJET_KEY ,
    characteristics:['fingerprint'],
    // define base rule ,can be empty if you wan to have 
    rules:[
//   does not make sense to add rate limmiting rule here
    shield({
        mode:"LIVE"
    }
    )
    ]

})