import React, { useState } from "react";
import { baseApiURL } from "../../baseUrl";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axios from "axios";
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API});
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../firebase/config";
const Student = () => {
  // const [file, setFile] = useState();
  const [selected, setSelected] = useState("add");
  // const [branch, setBranch] = useState();
  const [search, setSearch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    class: "",
    // branch: "",
    gender: "",
    // profile: "",
  });
  const [id, setId] = useState();
  // const getBranchData = () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   axios
  //     .get(`${baseApiURL()}/branch/getBranch`, { headers })
  //     .then((response) => {
  //       if (response.data.success) {
  //         setBranch(response.data.branches);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   const uploadFileToStorage = async (file) => {
  //     toast.loading("Upload Photo To Storage");
  //     const storageRef = ref(
  //       storage,
  //       `Student Profile/${data.branch}/${data.class} Class/${data.enrollmentNo}`
  //     );
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => {
  //         console.error(error);
  //         toast.dismiss();
  //         toast.error("Something Went Wrong!");
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           toast.dismiss();
  //           // setFile();
  //           toast.success("Profile Uploaded To Storage");
  //           setData({ ...data, profile: downloadURL });
  //         });
  //       }
  //     );
  //   };
  //   file && uploadFileToStorage(file);
  // }, [data, file]);

  // useEffect(() => {
  //   getBranchData();
  // }, []);
  
  function sendMailgunEmail(to, subject,html) {
    mg.messages.create('csproconnect.me', {
      from: 'CSProConnect Admin <admin@csproconnect.me>',
      to: [to],
      subject: subject,
      // text: text,
      html: html,
    })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error
  }

  function generateRandomPassword() {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';
 
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);
 
        pass += str.charAt(char)
    }
 
    return pass;
  }

  function sendLoginCredentials(email, loginId, password,recepient) {
    // Compose the email message
    const subject = "Your CSProConnect Student Account has been successfully registered";
    // const text = `Your login ID: ${loginId}\nYour password: ${password}`;
    const html = `<style>@media (max-width:600px){.gmx-killpill.r0-o{border-style:solid !important;margin:0 auto 0 auto !important;width:300px !important}.r1-c{box-sizing:border-box !important;text-align:center !important;valign:top !important;width:100% !important}.r2-o{border-style:solid !important;margin:0 auto 0 auto !important;width:100% !important}.r3-i{padding-bottom:0px !important;padding-left:15px !important;padding-right:15px !important;padding-top:0px !important}.r4-c{box-sizing:border-box !important;display:block !important;valign:top !important;width:100% !important}.r5-o{border-style:solid !important;width:100% !important}.r6-i{padding-left:0px !important;padding-right:0px !important}.r7-c{box-sizing:border-box !important;text-align:center !important;valign:top !important;width:180px !important}.r8-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:180px !important}.r9-i{padding-bottom:30px !important;padding-top:30px !important}.r10-c{box-sizing:border-box !important;text-align:center !important;valign:top !important;width:140px !important}.r11-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:140px !important}.r12-i{padding-bottom:15px !important;padding-top:15px !important}.r13-i{padding-bottom:0px !important;padding-left:0px !important;padding-right:0px !important;padding-top:0px !important}.r14-i{padding-bottom:10px !important;padding-left:0px !important;padding-right:0px !important}.r15-c{box-sizing:border-box !important;text-align:center !important;valign:top !important;width:300px !important}.r16-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:300px !important}.r17-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;margin-bottom:30px !important;margin-top:0px !important;width:300px !important}.r18-o{display:none !important}.r19-c{box-sizing:border-box !important;valign:bottom !important;width:100% !important}.r20-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:100% !important}.r21-i{padding-bottom:0px !important;padding-top:0px !important}.r22-o{background-size:cover !important;border-style:solid !important;margin:0 auto 0 auto !important;margin-bottom:0px !important;margin-top:0px !important;width:100% !important}.r23-i{background-color:#fbffff !important;padding-bottom:0px !important;padding-left:0px !important;padding-right:0px !important;padding-top:0px !important}.r24-c{box-sizing:border-box !important;text-align:left !important;valign:top !important;width:100% !important}.r25-o{border-style:solid !important;margin:0 auto 0 0 !important;width:100% !important}.r26-i{padding-bottom:20px !important;padding-left:20px !important;padding-right:20px !important;padding-top:20px !important;text-align:left !important}.r27-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:90% !important}.r28-i{background-color:#fbffff !important;color:#3b3f44 !important;padding-bottom:10px !important;padding-left:15px !important;padding-right:15px !important;padding-top:0px !important}.r29-i{color:#3b3f44 !important;padding-left:0px !important;padding-right:0px !important}.r30-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;width:60% !important}.r31-i{color:#3b3f44 !important;padding-bottom:15px !important;padding-top:15px !important}.r32-i{color:#3b3f44 !important;padding-bottom:0px !important;padding-top:0px !important;text-align:center !important}.r33-c{box-sizing:border-box !important;text-align:center !important;width:100% !important}.r34-i{color:#3b3f44 !important;font-size:0px !important;padding-bottom:15px !important;padding-left:55px !important;padding-right:55px !important;padding-top:15px !important}.r35-c{box-sizing:border-box !important;width:32px !important}.r36-o{border-style:solid !important;margin-right:8px !important;width:32px !important}.r37-i{padding-bottom:5px !important;padding-top:5px !important}.r38-o{border-style:solid !important;margin-right:0px !important;width:32px !important}.r39-i{background-color:#fbffff !important;color:#3b3f44 !important;padding-left:15px !important;padding-right:15px !important}.r40-i{color:#3b3f44 !important;padding-bottom:20px !important;padding-left:20px !important;padding-right:20px !important;padding-top:20px !important}.r41-i{background-color:#fbffff !important;color:#3b3f44 !important;padding-bottom:0px !important;padding-top:5px !important;text-align:center !important}.r42-o{background-size:auto !important;border-style:solid !important;margin:0 auto 0 auto !important;margin-bottom:40px !important;width:100% !important}.body-mobile{padding-bottom:0px !important;padding-top:0px !important}body{-webkit-text-size-adjust:none}.nl2go-responsive-hide{display:none}.nl2go-body-table{min-width:unset !important}.mobshow{height:auto !important;overflow:visible !important;max-height:unset !important;visibility:visible !important;border:none !important}.resp-table{display:inline-table !important}.magic-resp{display:table-cell !important}}</style>
<style>@import url("https://fonts.googleapis.com/css2?family=Open Sans&family=Open Sans Condensed");@import url("https://fonts.googleapis.com/css2?family=Almarai");</style>
<style>p, h1, h2, h3, h4, ol, ul{margin:0;}a, a:link{color:#3f9af5;text-decoration:underline}.nl2go-default-textstyle{color:#3b3f44;font-family:Arial;font-size:16px;line-height:1.5;word-break:break-word}.default-button{color:#ffffff;font-family:Arial;font-size:16px;font-style:normal;font-weight:normal;line-height:1.15;text-decoration:none;word-break:break-word}.default-heading1{color:#040f21;font-family:Almarai, arial;font-size:60px;word-break:break-word}.default-heading2{color:#1F2D3D;font-family:Almarai, arial;font-size:32px;word-break:break-word}.default-heading3{color:#1F2D3D;font-family:Almarai, arial;font-size:24px;word-break:break-word}.default-heading4{color:#1F2D3D;font-family:Almarai, arial;font-size:18px;word-break:break-word}a[x-apple-data-detectors]{color:inherit !important;text-decoration:inherit !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}.no-show-for-you{border:none;display:none;float:none;font-size:0;height:0;line-height:0;max-height:0;mso-hide:all;overflow:hidden;table-layout:fixed;visibility:hidden;width:0;}</style>
<style>a:link{color:#3f9af5;text-decoration:underline}</style>
<div>
  <table class="nl2go-body-table" style="background-image: url('https://img.mailinblue.com/1511132/images/content_library/original/64f2155552dd0735bd1ef57c.png'); background-position: top; background-repeat: no-repeat; background-size: auto; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td>
          <table class="r0-o" style="table-layout: fixed; width: 600px;" role="presentation" border="0" width="600" cellspacing="0" cellpadding="0" align="center">
            <tbody>
              <tr>
                <td valign="top">
                  <table class="r2-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="r3-i">
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r4-c" style="font-weight: normal;" valign="top" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" style="padding-left: 15px; padding-right: 15px;" valign="top">
                                          <table style="height: 277px; width: 103.158%;" role="presentation" border="0" width="588" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r7-c" style="text-align: center; width: 100%;" align="right">
                                                  <img src="https://share1.cloudhq-mkt3.net/1488810908ac1c.png" alt="CSProConnect" width="224" height="153">
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r2-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="r3-i">
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r4-c" style="font-weight: normal;" valign="top" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">&nbsp;</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r2-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="r13-i">
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r4-c" style="font-weight: normal;" valign="top" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r14-i" valign="top">
                                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r15-c" align="left">
                                                  <h1 class="email-heading" style="color: #333; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 300; line-height: 1.3; word-break: normal; font-size: 26px; margin: 0; padding: 14px 0;" align="center">
                                                    <a href="https://education.github.com/globalcampus/student?email_referrer=true" style="color: #333; text-decoration: none;">✨ 
                                                      <span style="color: #00ffff;">Welcome to CSProConnect</span>
                                                    </a>
                                                  </h1>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td class="r15-c" align="left">
                                                  <table class="r17-o" style="table-layout: fixed; width: 600px; height: 47px;" role="presentation" border="0" width="600" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr style="height: 17px;">
                                                        <td class="r13-i" style="height: 17px; width: 600px;">
                                                          <br>
                                                        </td>
                                                      </tr>
                                                      <tr class="nl2go-responsive-hide" style="height: 30px;">
                                                        <td style="font-size: 30px; line-height: 30px; height: 30px; width: 600px;" height="30">­</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r18-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td>
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r19-c" style="font-weight: normal;" valign="bottom" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">
                                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r1-c" align="center">
                                                  <table class="r20-o" style="table-layout: fixed; width: 600px; height: 23px;" role="presentation" border="0" width="600" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr style="height: 23px;">
                                                        <td class="r21-i" style="font-size: 0px; line-height: 0px; height: 23px; width: 600px;">
                                                          <img style="display: block; width: 100%;" src="https://img.emails1.copyleaks.com/im/sh/mjEeH420ZoSe.png?u=92pJLo34vnrQubXL4RGWjGYLRLMOzmja1DN" width="600" border="0">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r22-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td class="r23-i" style="background-color: #fbffff;">
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r4-c" style="font-weight: normal;" valign="top" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">
                                          <table style="height: 602px; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr style="height: 212px;">
                                                <td class="r24-c" style="height: 168px;" align="left">
                                                  <table class="r25-o" style="table-layout: fixed; width: 100%; height: 192px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr style="height: 192px;">
                                                        <td class="r26-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 20px; padding-left: 20px; padding-right: 20px; text-align: left; height: 192px; width: 100%;" align="left" valign="top">
                                                          <div>
                                                            <p style="margin: 0;">Hey 
                                                              <strong>${recepient}</strong>,
                                                              <br>
                                                              <br>
                                                            </p>
                                                            <p style="text-align: left;">We are delighted to welcome you to CSProConnect, our online platform designed to facilitate seamless communication and collaboration within our MSU CSE Department. Your registration was successful, and we're excited to have you on board.
                                                              <br>
                                                              <br>
                                                            </p>
                                                            <p>Below, you will find your login credentials for CSProConnect:
                                                              <br>
                                                              <br>
                                                            </p>
                                                            <strong>Username:</strong> ${loginId}
                                                            <br>
                                                            <strong>Temporary Password:</strong> ${password}
                                                            <br>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr style="height: 424px;">
                                                <td class="r24-c" style="height: 424px;" align="left">
                                                  <table class="r25-o" style="table-layout: fixed; width: 100.334%; height: 554px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr style="height: 528px;">
                                                        <td class="r26-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; line-height: 1.5; word-break: break-word; text-align: left; padding: 20px; height: 528px;" align="left" valign="top">
                                                          <p>To ensure the security of your account, we recommend that you change your temporary password as soon as possible after logging in. Please follow these steps to reset your password:
                                                            <br>
                                                            <br>
                                                          </p>
                                                          <ol>
                                                            <li>Visit CSProConnect at 
                                                              <a href="https://csproconnect.me/">csproconnect.me</a>
                                                            </li>
                                                            <li>Click on the "Change Password" link on 'My Profile' Section.</li>
                                                            <li>Follow the on-screen instructions to create a new, secure password.
                                                              <br>
                                                            </li>
                                                          </ol>
                                                          <br>
                                                          <br>
                                                          <p>Please keep your login credentials safe and do not share them with anyone. If you have any questions or encounter any issues during the registration process, please don't hesitate to reach out to our department admin for assistance.
                                                            <br>
                                                            <br>
                                                          </p>
                                                          <p>Once again, welcome to CSProConnect! Feel free to give any feedbacks to improve this platform.
                                                            <br>
                                                            <br>
                                                          </p>
                                                          <p>Best regards,
                                                            <br>
                                                            <br><strong>Admin</strong>
                                                            <br><strong>CSE Department</strong>
                                                            <br><strong>Faculty of Technology &amp; Engineering,MSU</strong>
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r18-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td>
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r19-c" style="font-weight: normal;" valign="bottom" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">
                                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r1-c" align="center">
                                                  <table class="r20-o" style="table-layout: fixed; width: 600px;" role="presentation" border="0" width="600" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                      <tr>
                                                        <td class="r21-i" style="font-size: 0px; line-height: 0px;">
                                                          <img style="display: block; width: 100%;" src="https://img.emails1.copyleaks.com/im/sh/zuvbf6kDeDpY.png?u=bLfru2eiMfsd35CryhLoGOoD5ESVQ0pczThx" width="600" border="0">
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr class="nl2go-responsive-hide">
                        <td style="font-size: 40px; line-height: 40px;" height="40">­</td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r18-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td>
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r19-c" style="font-weight: normal;" valign="bottom" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">
                                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r1-c" align="center">
                                                  <br>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="r18-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                    <tbody>
                      <tr>
                        <td>
                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <th class="r19-c" style="font-weight: normal;" valign="bottom" width="100%">
                                  <table class="r5-o" style="table-layout: fixed; width: 100%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td class="r6-i" valign="top">
                                          <table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                              <tr>
                                                <td class="r1-c" align="center">&nbsp;</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<style>#outlook a{padding:0;}.ExternalClass{width:100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;}table td{border-collapse:collapse;mso-line-height-rule:exactly;}.editable.image{font-size:0 !important;line-height:0 !important;}.nl2go_preheader{display:none !important;mso-hide:all !important;mso-line-height-rule:exactly;visibility:hidden !important;line-height:0px !important;font-size:0px !important;}body{width:100% !important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;}img{outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}a img{border:none;}table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}th{font-weight:normal;text-align:left;}*[class="gmail-fix"]{display:none !important;}</style>
<style>@media (max-width:600px){.gmx-killpill}</style>`
    // Send the email
    sendMailgunEmail(email, subject,html);
  }

  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          const password = generateRandomPassword(); // Implement this function
          sendLoginCredentials(data.email, data.enrollmentNo, password,data.firstName);
          axios
            .post(
              `${baseApiURL()}/student/auth/register`,
              { loginid: data.enrollmentNo, password},
              {
                headers: headers,
              }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                // setFile();
                setData({
                  enrollmentNo: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  class: "",
                  // branch: "",
                  gender: "",
                  // profile: "",
                });
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };
  const updateStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Updating Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/updateDetails/${id}`, data, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          // setFile("");
          setSearch("");
          setId("");
          setData({
            enrollmentNo: "",
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            class: "",
            // branch: "",
            gender: "",
            // profile: "",
          });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const searchStudentHandler = (e) => {
    e.preventDefault();
    toast.loading("Getting Student");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/details/getDetails`,
        { enrollmentNo: search },
        { headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          if (response.data.user.length === 0) {
            toast.error("No Student Found!");
          } else {
            toast.success(response.data.message);
            setData({
              enrollmentNo: response.data.user[0].enrollmentNo,
              firstName: response.data.user[0].firstName,
              middleName: response.data.user[0].middleName,
              lastName: response.data.user[0].lastName,
              email: response.data.user[0].email,
              phoneNumber: response.data.user[0].phoneNumber,
              class: response.data.user[0].class,
              // branch: response.data.user[0].branch,
              gender: response.data.user[0].gender,
              // profile: response.data.user[0].profile,
            });
            setId(response.data.user[0]._id);
          }
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const setMenuHandler = (type) => {
    setSelected(type);
    // setFile("");
    setSearch("");
    setId("");
    setData({
      enrollmentNo: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      class: "",
      // branch: "",
      gender: "",
      // profile: "",
    });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Details" />
        <div className="flex justify-end items-center w-full">
          <button
            className={`${selected === "add" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm mr-6`}
            onClick={() => setMenuHandler("add")}
          >
            Add Student
          </button>
          <button
            className={`${selected === "edit" && "border-b-2 "
              }border-blue-500 px-4 py-2 text-black rounded-sm`}
            onClick={() => setMenuHandler("edit")}
          >
            Edit Student
          </button>
        </div>
      </div>
      {selected === "add" && (
        <form
          onSubmit={addStudentProfile}
          className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
        >
          <div className="w-[40%]">
            <label htmlFor="firstname" className="leading-7 text-sm ">
              Enter First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="middlename" className="leading-7 text-sm ">
              Enter Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              value={data.middleName}
              onChange={(e) => setData({ ...data, middleName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="lastname" className="leading-7 text-sm ">
              Enter Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
              Enter Enrollment No
            </label>
            <input
              type="number"
              id="enrollmentNo"
              value={data.enrollmentNo}
              onChange={(e) =>
                setData({ ...data, enrollmentNo: e.target.value })
              }
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="email" className="leading-7 text-sm ">
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="phoneNumber" className="leading-7 text-sm ">
              Enter Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) =>
                setData({ ...data, phoneNumber: e.target.value })
              }
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="class" className="leading-7 text-sm ">
              Select Class
            </label>
            <select
              id="class"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.class}
              onChange={(e) => setData({ ...data, class: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="BE-I">BE-I</option>
              <option value="BE-II">BE-II</option>
              <option value="BE-III">BE-III</option>
              <option value="BE-IV">BE-IV</option>
              <option value="MCA-I">MCA-I</option>
              <option value="MCA-II">MCA-II</option>
            </select>
          </div>
          {/* <div className="w-[40%]">
            <label htmlFor="branch" className="leading-7 text-sm ">
              Select Branch
            </label>
            <select
              id="branch"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.branch}
              onChange={(e) => setData({ ...data, branch: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              {branch?.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
            </select>
          </div> */}
          <div className="w-[40%]">
            <label htmlFor="gender" className="leading-7 text-sm ">
              Select Gender
            </label>
            <select
              id="gender"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option defaultValue>-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* <div className="w-[40%]">
            <label htmlFor="file" className="leading-7 text-sm ">
              Select Profile
            </label>
            <label
              htmlFor="file"
              className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
            >
              Upload
              <span className="ml-2">
                <FiUpload />
              </span>
            </label>
            <input
              hidden
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
          >
            Add New Student
          </button>
        </form>
      )}
      {selected === "edit" && (
        <div className="my-6 mx-auto w-full">
          <form
            className="flex justify-center items-center border-2 border-blue-500 rounded w-[40%] mx-auto"
            onSubmit={searchStudentHandler}
          >
            <input
              type="text"
              className="px-6 py-3 w-full outline-none"
              placeholder="Enrollment No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="px-4 text-2xl hover:text-blue-500" type="submit">
              <FiSearch />
            </button>
          </form>
          {search && id && (
            <form
              onSubmit={updateStudentProfile}
              className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
            >
              <div className="w-[40%]">
                <label htmlFor="firstname" className="leading-7 text-sm ">
                  Enter First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={data.firstName}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="middlename" className="leading-7 text-sm ">
                  Enter Middle Name
                </label>
                <input
                  type="text"
                  id="middlename"
                  value={data.middleName}
                  onChange={(e) =>
                    setData({ ...data, middleName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="lastname" className="leading-7 text-sm ">
                  Enter Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={data.lastName}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
                  Enrollment No
                </label>
                <input
                  disabled
                  type="number"
                  id="enrollmentNo"
                  value={data.enrollmentNo}
                  onChange={(e) =>
                    setData({ ...data, enrollmentNo: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="email" className="leading-7 text-sm ">
                  Enter Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="phoneNumber" className="leading-7 text-sm ">
                  Enter Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="w-[40%]">
                <label htmlFor="class" className="leading-7 text-sm ">
                  Class
                </label>
                <select
                  id="class"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.class}
                  onChange={(e) =>
                    setData({ ...data, class: e.target.value })
                  }
                >
                  <option defaultValue>-- Select --</option>
                  <option value="BE-I">BE-I</option>
                  <option value="BE-II">BE-II</option>
                  <option value="BE-III">BE-III</option>
                  <option value="BE-IV">BE-IV</option>
                  <option value="MCA-I">MCA-I</option>
                  <option value="MCA-II">MCA-II</option>
                </select>
              </div>
              {/* <div className="w-[40%]">
                <label htmlFor="branch" className="leading-7 text-sm ">
                  Branch
                </label>
                <select
                  disabled
                  id="branch"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.branch}
                  onChange={(e) => setData({ ...data, branch: e.target.value })}
                >
                  <option defaultValue>-- Select --</option>
                  {branch?.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.name}>
                        {branch.name}
                      </option>
                    );
                  })}
                </select>
              </div> */}
              <div className="w-[40%]">
                <label htmlFor="gender" className="leading-7 text-sm ">
                  Select Gender
                </label>
                <select
                  id="gender"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* <div className="w-[40%]">
                <label htmlFor="file" className="leading-7 text-sm ">
                  Select New Profile
                </label>
                <label
                  htmlFor="file"
                  className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
                >
                  Upload
                  <span className="ml-2">
                    <FiUpload />
                  </span>
                </label>
                <input
                  hidden
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div> */}
              <button
                type="submit"
                className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
              >
                Update Student
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Student;
