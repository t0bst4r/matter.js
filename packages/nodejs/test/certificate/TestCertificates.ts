/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bytes } from "#general";

export const CERTIFICATE_SETS = {
    "General Test Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "153001010024020137032414001826048012542826058015203b37062414001824070124080130094104d89eb7e3f3226d0918f4b85832457bb9981bca7aaef58c18fb5ec07525e472b2bd1617fb75ee41bd388f94ae6a6070efc896777516a5c54aff74ec0804cdde9d370a3501290118240260300414e766069362d7e35b79687161644d222bdde93a68300514e766069362d7e35b79687161644d222bdde93a6818300b404e8fb06526f0332b3e928166864a6d29cade53fb5b8918a6d134d0994bf1ae6dce6762dcba99e80e96249d2f1ccedb336b26990f935dba5a0b9e5b4c9e5d1d8f18",
            ),
            ASN1: Bytes.fromHex(
                "3082013ca003020102020100300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1030303030303030303030303030303030301e170d3231303631303030303030305a170d3331303630383030303030305a30223120301e060a2b0601040182a27c01040c10303030303030303030303030303030303059301306072a8648ce3d020106082a8648ce3d03010703420004d89eb7e3f3226d0918f4b85832457bb9981bca7aaef58c18fb5ec07525e472b2bd1617fb75ee41bd388f94ae6a6070efc896777516a5c54aff74ec0804cdde9da3633061300f0603551d130101ff040530030101ff300e0603551d0f0101ff040403020106301d0603551d0e04160414e766069362d7e35b79687161644d222bdde93a68301f0603551d23041830168014e766069362d7e35b79687161644d222bdde93a68",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "153001010124020137032414001826048012542826058015203b37062415012411da1824070124080130094104e0bf14a052dd7ab08d485e20570c6e6ac6fbb99513d3aacd66808c722941ae0538e9323ec89f39228bd228270f1716539cecc64e62b26c58c3355d68935d87b2370a350128011824020136030402040118300414c524e05cad04a826ecda84501766732b5f181354300514e766069362d7e35b79687161644d222bdde93a6818300b40aca27ff4b68e81168295b85753e128226ec3d7b35916be9b32f4311bb4eb39a3b9e5583c8d762be1e9332647d61088bb057b6844892654c97624797d0390c9c318",
            ),
            ASN1: Bytes.fromHex(
                "3082017fa003020102020101300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1030303030303030303030303030303030301e170d3231303631303030303030305a170d3331303630383030303030305a30443120301e060a2b0601040182a27c01050c10303030303030303030303030303030313120301e060a2b0601040182a27c01010c10303030303030303030303030303044413059301306072a8648ce3d020106082a8648ce3d03010703420004e0bf14a052dd7ab08d485e20570c6e6ac6fbb99513d3aacd66808c722941ae0538e9323ec89f39228bd228270f1716539cecc64e62b26c58c3355d68935d87b2a38183308180300c0603551d130101ff04023000300e0603551d0f0101ff04040302078030200603551d250101ff0416301406082b0601050507030206082b06010505070301301d0603551d0e04160414c524e05cad04a826ecda84501766732b5f181354301f0603551d23041830168014e766069362d7e35b79687161644d222bdde93a68",
            ),
        },
    },
    "Matter 1.2 Specification Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "1530010859eaa632947f541c2402013703271401000000cacacaca182604ef171b2726056eb5b94c3706271401000000cacacaca18240701240801300941041353a3b3ef1da708c4908048014e407d5990ce22bc4eb33e9a5acb25a85603eba6dcd8213666a4e44f5aca13eb767fafa7dcdddc33411f82a30b543dd1d24ba8370a350129011824026030041413af81ab37374b2ed2a9649b12b7a3a4287e151d30051413af81ab37374b2ed2a9649b12b7a3a4287e151d18300b40458164466c8f195abc0abb7c6cb5a27a83f41d37f8d53beec520abd2a0da0509b8a7c25c042e30cf64dc30fe334e120019664e515049134f5781238444fc753118",
            ),
            ASN1: Bytes.fromHex(
                "30820143a003020102020859eaa632947f541c300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1043414341434143413030303030303031301e170d3230313031353134323334335a170d3430313031353134323334325a30223120301e060a2b0601040182a27c01040c10434143414341434130303030303030313059301306072a8648ce3d020106082a8648ce3d030107034200041353a3b3ef1da708c4908048014e407d5990ce22bc4eb33e9a5acb25a85603eba6dcd8213666a4e44f5aca13eb767fafa7dcdddc33411f82a30b543dd1d24ba8a3633061300f0603551d130101ff040530030101ff300e0603551d0f0101ff040403020106301d0603551d0e0416041413af81ab37374b2ed2a9649b12b7a3a4287e151d301f0603551d2304183016801413af81ab37374b2ed2a9649b12b7a3a4287e151d",
            ),
        },
        ICAC: {
            TLV: Bytes.fromHex(
                "153001082db444855641aedf2402013703271401000000cacacaca182604ef171b2726056eb5b94c3706271303000000cacacaca1824070124080130094104c5d0861bb8f90c405c12314e4c5ebeea939f72774bcc33239e2f59f6f46af8dc7d4682a0e3ccc646e6df29ea86bf562ae720a898337d383f32c0a09e416019ea370a35012901182402603004145352d7059e9c15a508906862864801a29f1f41d330051413af81ab37374b2ed2a9649b12b7a3a4287e151d18300b40841a06d43b5e9fecd24e87b1244eb51c6a2cf20d9b5e6ba07f11e6002f7e0ca34e32a602c3609d0092d348bdbd198a114646bd41cf103783641ae25e3f23fd2618",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "153001083efcff1702b9a17a2402013703271303000000cacacaca182604ef171b2726056eb5b94c3706271101000100dededede27151d0000000000b0fa18240701240801300941049a2a216fb39dd6b6fa211b835c89e3e6afb66c14f75831954f9ff4f7a3f0112c8a0d8eaf29c653294d48eee0708a032cca39393c3a7b46f181aea078fead8383370a3501280118240201360304020401183004149f55a26b7e4303e60883e913bf94f4fb5e2a61613005145352d7059e9c15a508906862864801a29f1f41d318300b407955c202630b4ba4d5912526322fdf28f89edfe5af9c0e572bd8a14aaabb4d12b83ca17c7b05fb164b77d79c529613316bcfd17895e4b2a4f2404b981732715918",
            ),
        },
    },
    "Apple Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "15300101002402013703271447345acbc31be2c2241502182604a24f012b2405003706271447345acbc31be2c224150218240701240801300941047f7bd2a28eaa181abd4118140037c6354c834cf74909dc138f9db212e609d0eeec47af344f0701c395e3ef4b5a5454c7664ddb3d3c0f8b08920f9580b31c7e7a370a35012901182402603004144b1c9982934b8bd2e6b3c407d3611db976e50e733005144b1c9982934b8bd2e6b3c407d3611db976e50e7318300b40695aabe01d624cc0a156f7d9fefea67a28257c789f16d232564c4d6d5614f89d1403249522b317c244ddfa6b7eb335496d1e0aa3f8614e1307cb855c0d1036f518",
            ),
            ASN1: Bytes.fromHex(
                "30820182a003020102020100300a06082a8648ce3d04030230443120301e060a2b0601040182a27c01040c10433245323142433343423541333434373120301e060a2b0601040182a27c01050c10303030303030303030303030303030323020170d3232313131313138323333305a180f39393939313233313233353935395a30443120301e060a2b0601040182a27c01040c10433245323142433343423541333434373120301e060a2b0601040182a27c01050c10303030303030303030303030303030323059301306072a8648ce3d020106082a8648ce3d030107034200047f7bd2a28eaa181abd4118140037c6354c834cf74909dc138f9db212e609d0eeec47af344f0701c395e3ef4b5a5454c7664ddb3d3c0f8b08920f9580b31c7e7aa3633061300f0603551d130101ff040530030101ff300e0603551d0f0101ff040403020106301d0603551d0e041604144b1c9982934b8bd2e6b3c407d3611db976e50e73301f0603551d230418301680144b1c9982934b8bd2e6b3c407d3611db976e50e73",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "15300101012402013703271447345acbc31be2c224150218260467a8aa2d24050037062415022611fb9e0963182407012408013009410418c41fcfc6ea1144975f5ae9677252f7b9ef82e6ef185be07095c699dd0f4487668efc61a9ccc09e1d5f7465f2d547e0b8edaf550d40b86f40fde25231e06b19370a350128011824020136030402040118300414f367d7c6dde5a2c92bed2a2493a858946ce1af773005144b1c9982934b8bd2e6b3c407d3611db976e50e7318300b400525a0ad8e4ee840108c4250d5a7c4bf8ac442ffe4b3199e2ce84ececf14efb65c1fe14b5606a3be85a93f76133e96f4905a143e7c4c0f07ec7c94ead32d832918",
            ),
            ASN1: Bytes.fromHex(
                "308201a3a003020102020101300a06082a8648ce3d04030230443120301e060a2b0601040182a27c01040c10433245323142433343423541333434373120301e060a2b0601040182a27c01050c10303030303030303030303030303030323020170d3234303431313133353535315a180f39393939313233313233353935395a30443120301e060a2b0601040182a27c01050c10303030303030303030303030303030323120301e060a2b0601040182a27c01010c10303030303030303036333039394546423059301306072a8648ce3d020106082a8648ce3d0301070342000418c41fcfc6ea1144975f5ae9677252f7b9ef82e6ef185be07095c699dd0f4487668efc61a9ccc09e1d5f7465f2d547e0b8edaf550d40b86f40fde25231e06b19a38183308180300c0603551d130101ff04023000300e0603551d0f0101ff04040302078030200603551d250101ff0416301406082b0601050507030206082b06010505070301301d0603551d0e04160414f367d7c6dde5a2c92bed2a2493a858946ce1af77301f0603551d230418301680144b1c9982934b8bd2e6b3c407d3611db976e50e73",
            ),
        },
    },
    "Google Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "153001010124020137032c840255532c0706476f6f676c652c010b4d617474657220526f6f74271401000000feffffff1826047fd2432926057f945be537062c840255532c0706476f6f676c652c010b4d617474657220526f6f74271401000000feffffff18240701240801300941045b37df6549c20dc8d722a6b8acb660a8a764ce7baf6c6c224f7ee84349684ad7d809ff650033d1527dcf1fbaac6a9c3ad8b41edac909f7b5c760fd542c892375370a350129012402011824026030041472c201f7571913b348ca00ca7b45f4774668c97e30051472c201f7571913b348ca00ca7b45f4774668c97e18300b4065164b166adff18c15610a8ce91bd703e9c1f677b711ce133505152df0da15111675ac5591cee786851cdd9efdad296674bebcb2a3a3209bcde7b309db552c6f18",
            ),
            ASN1: Bytes.fromHex(
                "308201a9a003020102020101300a06082a8648ce3d0403023056310b3009060355040613025553310f300d060355040a0c06476f6f676c653114301206035504030c0b4d617474657220526f6f743120301e060a2b0601040182a27c01040c10464646464646464530303030303030313020170d3231313230383230333035355a180f32313231313230383230333035355a3056310b3009060355040613025553310f300d060355040a0c06476f6f676c653114301206035504030c0b4d617474657220526f6f743120301e060a2b0601040182a27c01040c10464646464646464530303030303030313059301306072a8648ce3d020106082a8648ce3d030107034200045b37df6549c20dc8d722a6b8acb660a8a764ce7baf6c6c224f7ee84349684ad7d809ff650033d1527dcf1fbaac6a9c3ad8b41edac909f7b5c760fd542c892375a366306430120603551d130101ff040830060101ff020101300e0603551d0f0101ff040403020106301d0603551d0e0416041472c201f7571913b348ca00ca7b45f4774668c97e301f0603551d2304183016801472c201f7571913b348ca00ca7b45f4774668c97e",
            ),
        },
        ICAC: {
            TLV: Bytes.fromHex(
                "153001010224020137032c840255532c0706476f6f676c652c010b4d617474657220526f6f74271401000000feffffff18260440d34329260540955be537062c840255532c0706476f6f676c652c010f4d61747465722075732d6561737431271302000000feffffff1824070124080130094104edb9dce05aaa200d89535964b9ee05e874a3f9cd4665dd7905879864efb091b8b485ab54cfc31de20b1c2d91f78786468ac00c24a13423e5a31b1eae6b0a93c6370a350129012402001824026030041481420662831a8a83e7247bff47de6cdb19883a2930051472c201f7571913b348ca00ca7b45f4774668c97e18300b4008767394a59c29729a7464f3bf42e2e4d343ff13f90d7aa94eb5aa9cfb67c202356fb5aa0af4fc478117893421f0c5779ea882abd650fa18c168246bfc0e13a218",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "15300110654729dfcf6ab005b8901c7593f93f8a24020137032c840255532c0706476f6f676c652c010f4d61747465722075732d6561737431271302000000feffffff18260482f8ae2d260587fe465337062715b9e72b6ced77cd162611f17e706d1824070124080130094104767d4bdbf3dce10d6312ce84b47f952cf6c7cb8bb86a38c734106e03b2ea266a3ac79dae78d77e43629b8b436104098323cceb75dd852ef1cdbc10ed6d952f45370a350128011824020136030402040118300414880f043201b38f86b50122b895b51e8fdee1993b30051481420662831a8a83e7247bff47de6cdb19883a2918300b40ec916ed127f2f11edc95f90e2793ae30e130dac46c5bfa84ce44771e5c16801d6d94b78dfdf0c87d532cc3f15d6872bb294c78403058952908be376303249b7f18",
            ),
        },
    },
    "Amazon Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "15300111008f7e89d8d67b0aecdeae6d212deaa3b724020137032714d894477fd1553601182604537ac72a2605e378cd5937062714d894477fd15536011824070124080130094104047302d8c1c429049055346a31cf2c7e62d7266a3ddeb60a854810d9a8d3ed50a2e90bb5f1fad51b29b727c153946b64718ae2422ea10dfc9b7db0cbc48164d4370a3501290118300414c6e675219d6a1ebb8e664f86d80fe11c3758b859240261300514c6e675219d6a1ebb8e664f86d80fe11c3758b85918300b40092a586ace30018a5fa614cca2c2b23c58ab6c75dc8e759f95a7ba13db97d84043b532505e0cf61c187d29c00f56f90a4952dfb195163d49bbb1f5402e52ad9818",
            ),
            ASN1: Bytes.fromHex(
                "3082014ca0030201020211008f7e89d8d67b0aecdeae6d212deaa3b7300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1030313336353544313746343739344438301e170d3232303932383231333431315a170d3437303932383232333431315a30223120301e060a2b0601040182a27c01040c10303133363535443137463437393444383059301306072a8648ce3d020106082a8648ce3d03010703420004047302d8c1c429049055346a31cf2c7e62d7266a3ddeb60a854810d9a8d3ed50a2e90bb5f1fad51b29b727c153946b64718ae2422ea10dfc9b7db0cbc48164d4a3633061300f0603551d130101ff040530030101ff301d0603551d0e04160414c6e675219d6a1ebb8e664f86d80fe11c3758b859300e0603551d0f0101ff040403020186301f0603551d23041830168014c6e675219d6a1ebb8e664f86d80fe11c3758b859",
            ),
        },
        ICAC: {
            TLV: Bytes.fromHex(
                "1530011100a95aa1823a32582162f4b4116ea2561e24020137032714d894477fd1553601182604bd1e622d26054d7799493706271359cb602434233d1118240701240801300941044c47c47148c7c049120c92db2edefd7dd86db7ac6425ecaa8aecebf1143c384dcaa83a542e1d0d54487fb6cc7a0ae8c94442fe02d30acc8968808303d1a7092a370a3501290124020018300514c6e675219d6a1ebb8e664f86d80fe11c3758b859300414b1b4a84c6e069ff49099126e2074a554fe55d31e24026118300b4073d3fb9c4cf4ba22fffb4d9d4248be968646374cdfd8a79bf108379b74f7d1cf2569473ffc606e86ad301148ec964453e97c9a8b41f33588e97f5864162b7ad518",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "1530011100e2c7907d7c0ee8ca124370ceffb76fab2402013703271359cb602434233d1118260484e0ae2d260594f17a403706271522c119b02919a7002711f0155fc7aaf2f90218240701240801300941042f38b38e61fdd92077517638cfb7419448d418945ea0acc5fe5b09deae368cc1d840b2f383b6383f79c1f5c61d96929325e26c9d7e186267606398c8b2bba243370a3501280118300514b1b4a84c6e069ff49099126e2074a554fe55d31e300414aedfdbe5ae9ea1c1283977a8f11303abafbe67162402013603040204011818300b40c4ef43d01ed60d8a859ca73632aee482a3941a0f321e62590efbc8c7576af3d2e9ae1414de910f5983613cad8eff1a259f01f87af1d339f8962aa40e7f3672fc18",
            ),
            ASN1: Bytes.fromHex(
                "3082018fa003020102021100e2c7907d7c0ee8ca124370ceffb76fab300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01030c1031313344323333343234363043423539301e170d3234303431343138343432305a170d3334303431323139343432305a30443120301e060a2b0601040182a27c01050c10303041373139323942303139433132323120301e060a2b0601040182a27c01010c10303246394632414143373546313546303059301306072a8648ce3d020106082a8648ce3d030107034200042f38b38e61fdd92077517638cfb7419448d418945ea0acc5fe5b09deae368cc1d840b2f383b6383f79c1f5c61d96929325e26c9d7e186267606398c8b2bba243a38183308180300c0603551d130101ff04023000301f0603551d23041830168014b1b4a84c6e069ff49099126e2074a554fe55d31e301d0603551d0e04160414aedfdbe5ae9ea1c1283977a8f11303abafbe6716300e0603551d0f0101ff04040302078030200603551d250101ff0416301406082b0601050507030206082b06010505070301",
            ),
        },
    },
    "SmartThings Certificates": {
        ROOT: {
            TLV: Bytes.fromHex(
                "1530011100e2e22382cf8b0a5d6154721aad16888124020137032714ff5ac811916947d718260414aab32a2605240b1b3437062714ff5ac811916947d7182407012408013009410410d18ee66a35bb151ca6981395bb2b12d0b00705436f565de05636c8aae4a510cc36325f7c5b04286bc914808314f191d19813da78a884a9cca0bf9e4ec040db370a3501290118300414f3776b9803d4cd4c55269ef01bd50beb21152605240261300514f3776b9803d4cd4c55269ef01bd50beb2115260518300b40cf7be64b09641ec320dc30df26a5d873a306f8f75a7ecffe8be5bd55639e0a0f6e8126dc969268d1279ccd71cf112ccc178288c7d81367d0aa28b492a5ca049018",
            ),
            ASN1: Bytes.fromHex(
                "3082014ca003020102021100e2e22382cf8b0a5d6154721aad168881300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1044373437363939313131433835414646301e170d3232303931333230353233365a170d3237303931333231353233365a30223120301e060a2b0601040182a27c01040c10443734373639393131314338354146463059301306072a8648ce3d020106082a8648ce3d0301070342000410d18ee66a35bb151ca6981395bb2b12d0b00705436f565de05636c8aae4a510cc36325f7c5b04286bc914808314f191d19813da78a884a9cca0bf9e4ec040dba3633061300f0603551d130101ff040530030101ff301d0603551d0e04160414f3776b9803d4cd4c55269ef01bd50beb21152605300e0603551d0f0101ff040403020186301f0603551d23041830168014f3776b9803d4cd4c55269ef01bd50beb21152605",
            ),
        },
        ICAC: {
            TLV: Bytes.fromHex(
                "153001110090c76c01f23e1a7cc5cbb128f48b886224020137032714ff5ac811916947d7182604c280812d2605230b1b3437062713022dccf7da9b7da11824070124080130094104fbd2352ba2afe25d154609778b87c4c8fcc6c6cb4a672ba65113596df71d0bac22620e8aa27a40630484f0c62749560dad6d6ba800f6246bdfb1d23e3a391a51370a3501290124020018300514f3776b9803d4cd4c55269ef01bd50beb21152605300414c4744f525b764ea5c696073f21fd9deaae67e4ca24026018300b4065ba9477e323bf7496080ba77fc850855bc4082ea600a9fe30608b44caed98eff335a5ebc010f3311edecc8c63b98d9c704216ad6aa5c73f8ff5e1ee456437ef18",
            ),
        },
        NOC: {
            TLV: Bytes.fromHex(
                "1530011100f4ba17882d33b60e2451346f61d7760024020137032713022dccf7da9b7da1182604250aaf2d2605b4a4192f3706271179370682516a35082715589b23d28795b7541824070124080130094104256f8cd94f656cc94baca821eaa185b019d7749111927c0ce8711602a782f13e396bc72f7284395b8643d36f7f66b0feeec8f16ca8e89a070cb6495d2d466278370a3501280118300514c4744f525b764ea5c696073f21fd9deaae67e4ca300414b2d4e028daa6113b41ab29b74a1fe27b4c3933612402053603040204011818300b404fc617c32047971feb679b473529110f55cf9f3227da2f9fcc71c29aeded037eabf6800e9a512651b3bb5be3635886dc498ecaa0f955348a85f033b6f52239ac18",
            ),
        },
    },
};

export const TEST_NOC_CERT_CAT_ASN1 = Bytes.fromHex(
    "308201cea003020102020101300a06082a8648ce3d04030230223120301e060a2b0601040182a27c01040c1030303030303030303030303030303030301e170d3231303631303030303030305a170d3331303630383030303030305a3081923120301e060a2b0601040182a27c01050c10303030303030303030303030303030313120301e060a2b0601040182a27c01010c103030303030303030303030303030444131183016060a2b0601040182a27c01060c08313233343536373831183016060a2b0601040182a27c01060c08353637383930313231183016060a2b0601040182a27c01060c0839303132333435363059301306072a8648ce3d020106082a8648ce3d03010703420004e0bf14a052dd7ab08d485e20570c6e6ac6fbb99513d3aacd66808c722941ae0538e9323ec89f39228bd228270f1716539cecc64e62b26c58c3355d68935d87b2a38183308180300c0603551d130101ff04023000300e0603551d0f0101ff04040302078030200603551d250101ff0416301406082b0601050507030206082b06010505070301301d0603551d0e04160414c524e05cad04a826ecda84501766732b5f181354301f0603551d23041830168014e766069362d7e35b79687161644d222bdde93a68",
);

export const TEST_PRIVATE_KEY = Bytes.fromHex("727F1005CBA47ED7822A9D930943621617CFD3B79D9AF528B801ECF9F1992204");
export const TEST_PUBLIC_KEY = Bytes.fromHex(
    "0462e2b6e1baff8d74a6fd8216c4cb67a3363a31e691492792e61aee610261481396725ef95e142686ba98f339b0ff65bc338bec7b9e8be0bdf3b2774982476220",
);
export const TEST_CSR_REQUEST_ASN1 = Bytes.fromHex(
    "3070020100300e310c300a060355040a0c034353523059301306072a8648ce3d020106082a8648ce3d0301070342000462e2b6e1baff8d74a6fd8216c4cb67a3363a31e691492792e61aee610261481396725ef95e142686ba98f339b0ff65bc338bec7b9e8be0bdf3b2774982476220a000",
);
