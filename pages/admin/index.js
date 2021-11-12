import Head from "next/head";
import { Skeleton } from "@material-ui/lab";
import IMAGES from "@constants/IMAGES";
import Image from "next/dist/client/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminStyle from "@styles/Admin.module.css";
import PropTypes from "prop-types";
import { Paper, Button, Grid, Accordion } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
// import Pagination from '@material-ui/lab/Pagination';
import Stack from "@mui/material/Stack";
// import Stack from "@material-ui/core/styles";
import Box from "@mui/material/Box";
// import Box from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F0930D",
      main: "#F0930D",
      dark: "#F0930D",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#db4132",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
});

const styleSeeMore = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 430,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleMoreInfo = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1366,
  height: 597,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Admin() {
  let counterReport;
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [currentReportPost, setCurrentReportPost] = useState([]);
  const [openSeeMoreModal, setOpenSeeMoreModal] = useState(false);
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [selectReportPost, setSelectReportPost] = useState(-1);
  const [selectMoreInfoPost, setSelectMoreInfoPost] = useState(-1);
  const [reportPost, setReportPost] = useState([
    {
      image: IMAGES.catMockup1,
      date: "02/02/22",
      sex: "male",
      Collar: false,
      description: "หมาพันธ์นี้ไม่สุภาพเลย สีไม่สวย",
      postOn: "1 Oct 2021",
      deleteOn: "2 Oct 2021",
      note: "เนื้อหาไม่สุภาพ",
      reason: {
        เนื้อหาไม่สุภาพ: 1,
        a: 2,
        b: 3,
        c: 2,
        d: 3,
        cv: 2,
        sd: 7,
        ss: 7,
        sq: 7,
        sj: 7,
        sg: 7,
        s1: 7,
        s2: 7,
        s3: 7,
        s4: 7,
        s5: 7,
        s6: 7,
        s7: 7,
        s8: 7,
        s9: 7,
        s0: 7,
        s12: 7,
        s122: 7,
        ssg: 7,
        sssg: 7,
        sss1g: 7,
        sss2g: 7,
        sss3g: 7,
        sss4g: 7,
        sss5g: 7,
        sss6g: 7,
        sss7g: 7,
        sss8g: 7,
        sss9g: 7,
        sss0g: 7,
        sssjg: 7,
        sss22g: 7,
        sss23g: 7,
        sss424g: 7,
        sss23g: 7,
        sss12g: 7,
        ssssg: 7,
        ssfsg: 7,
        ssgsg: 7,
        sshsg: 7,
        ssjsg: 7,
        ssjsg: 7,
        jsssg: 7,
        sjssg: 7,
        ssjsg: 7,
        sssgg: 7,
        sssgj: 7,
        ss4sg: 7,
        sss4g: 7,
        s4ssg: 7,
        sss3g: 7,
        sss5g: 7,
        s6ssg: 7,
        sss7g: 7,
        s8ssg: 7,
      },
    },
    {
      image: IMAGES.catMockup2,
      date: "02/02/22",
      sex: "",
      collar: true,
      description: "หมาตัวนี้น่ากิน ถ้าเอาไปผัดกับเหล้าขาวจะอร่อยมาก",
      postOn: "4 Oct 2021",
      deleteOn: "5 Oct 2021",
      note: "เนื้อหาไม่สุภาพเลย มีแต่ภาพอนาจาร โพสลงมาได้อย่างไร ถ้าหากแอดมินมาเห็นฝากลบโพสนี้ด้วยครับ ถ้าหากเด็ก ๆ มาดูจะเป็นตัวอย่างที่ไม่ดี",
      reason: {
        เนื้อหาไม่สุภาพ: 1,
      },
    },
    {
      image: IMAGES.catMockup1,
      date: "",
      sex: "male",
      collar: true,
      description: "สุภาพมาก ",
      postOn: "6 Oct 2021",
      deleteOn: "7 Oct 2021",
      note: "ขอให้เธอและฉันได้เคียงคู่กันขอให้เราได้รักกันชัวนิรันดร์แค่ฉันและเธอค่ำคืนเหน็บหนาวในทุกๆวันขอมีเธอกอดฉันในยามค่ำคืนได้โปรดเถอะฟ้าช่วยรับคำอธิษฐานของเรา",
      reason: {
        เนื้อหาไม่สุภาพ: 6,
      },
    },
    {
      image: IMAGES.catMockup2,
      date: "02/02/22",
      sex: "male",
      collar: false,
      description: "",
      postOn: "7 Oct 2021",
      deleteOn: "-",
      note: "ฉันจะกอดเธอไว้ ขอโทษที่ฉันเคยกอดเเน่นไป ฉันขอโทษเธอ หากว่าฉันได้กอดเธออีกครั้ง ฉันจะทำให้ดีที่สุด ไม่ให้เธอไป กลับมาให้ฉันได้กอดเธอไว้ คำว่าลาที่ฟังครั้งนั้น มันทำให้ฉันอยากหยุดเคลื่อนไหว ถ้าเข้าไปกอดต้องนานเท่าไหร่ เธอจะคืนกลับมา หากยังไม่สายให้เธอได้รู้ ว่าฉันนั้นรักเธอมากเเค่ไหน เเละฉันจะทำ ทุกวินาที ให้เราได้อยู่ด้วยกันตลอดไป",
      reason: {
        b: 3,
      },
    },
    {
      image: IMAGES.catMockup1,
      date: "02/02/22",
      sex: "male",
      collar: false,
      description: "หมาพันธ์นี้ไม่สุภาพเลย สีไม่สวยด้วยอิอิ",
      postOn: "7 Oct 2021",
      deleteOn: "-",
      note: "เนื้อหาไม่สุภาพ",
      reason: {
        เนื้อหาไม่สุภาพ: 1,
        a: 2,
        b: 3,
      },
    },
    {
      image: IMAGES.catMockup2,
      date: "02/02/22",
      sex: "male",
      collar: false,
      description: "หมาพันธ์นี้ไม่สุภาพเลย สีไม่สวยด้วยอิอิ",
      postOn: "1 Oct 2021",
      deleteOn: "2 Oct 2021",
      note: "เนื้อหาไม่สุภาพ",
      reason: {
        เนื้อหาไม่สุภาพ: 1,
        a: 2,
        b: 3,
      },
    },
    {
      image: IMAGES.catMockup2,
      date: "02/02/22",
      sex: "",
      collar: false,
      description: "หมาพันธ์นี้ไม่สุภาพเลย สีไม่สวยด้วยอิอิ",
      postOn: "1 Oct 2021",
      deleteOn: "2 Oct 2021",
      note: "เนื้อหาไม่สุภาพ",
      reason: {
        เนื้อหาไม่สุภาพ: 1,
      },
    },
  ]);

  const handleChangePage = (event, value) => {
    setPage(value);
    console.log(value);
  };
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const renderPageItems = () => {
    let store = [];
    let initIndex = (page - 1) * 5;
    if (reportPost.length < 1) {
      console.log("not found");
      return;
    }
    for (let i = initIndex; i < initIndex + 5 && i < reportPost.length; i++) {
      store.push(reportPost[i]);
    }
    setCurrentReportPost(store);
    console.log("store");
    console.log(store);
    console.log("-------------------");
  };

  useEffect(() => {
    renderPageItems();

  }, [reportPost, page]);

  //   useEffect(async () => {
  //     try {
  //        await renderPageItems();
  //         await sumValue();
  //     } catch (e) {
  //         console.error(e);
  //     }
  // }, [reportPost, page]);

  useEffect(() => {
    setMaxPage(Math.ceil(reportPost.length / 5));
  }, [reportPost]);

  useEffect(() => {
    console.log(openSeeMoreModal);
  }, [openSeeMoreModal]);

  useEffect(() => {
    seeMore();
  }, [selectReportPost]);

  useEffect(() => {
    onMoreInfoModal();
  }, [selectMoreInfoPost]);

  const seeMore = () => {
    if (selectReportPost != -1) {
      setOpenSeeMoreModal(true);
    }
  };

  const onMoreInfoModal = () => {
    if (selectMoreInfoPost != -1) {
      setOpenMoreInfoModal(true);
    }
  };

  const handleCloseSeeMoreModal = () => {
    setOpenSeeMoreModal(false);
    setSelectReportPost(-1);
  };

  const handleCloseMoreInfoModal = () => {
    setOpenMoreInfoModal(false);
    setSelectMoreInfoPost(-1);
  };

  const seeMoreModal = (
    <Modal
      open={openSeeMoreModal}
      onClose={handleCloseSeeMoreModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // reason={currentReportPost[selectReportPost]}
    >
      <Box sx={styleSeeMore}>
        <p className="text-center">เหตุผลการรีพอร์ต</p>
        <div className="overflow-y-auto h-80 mt-6">
          {currentReportPost[selectReportPost]
            ? Object.entries(currentReportPost[selectReportPost].reason).map(
                ([key, value]) => {
                  return (
                    <p key={key}>
                      {key} {value}
                    </p>
                  );
                }
              )
            : "error"}
          <p>{reportPost.note}</p>
        </div>
      </Box>
    </Modal>
  );

  const moreInfoModal = (
    <Modal
      open={openMoreInfoModal}
      onClose={handleCloseMoreInfoModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleMoreInfo}>
        <div className="overflow-y-auto h-80">
          {/* {currentReportPost[selectReportPost]
            ? Object.entries(currentReportPost[selectReportPost].reason).map(
                ([key, value]) => {
                  return (
                    <p key={key}>
                      {key} {value}
                    </p>
                  );
                }
              )
            : "error"}
          <p>{reportPost.note}</p> */}
        </div>
      </Box>
    </Modal>
  );

const sumValue = () => {
  Object.entries(currentReportPost.reason).map(
    ([key, value]) => {
      return (
        <p key={key}>
          {key} {value}
        </p>
      );
    }
  )
}

  return (
    <div
      style={{ fontFamily: "Prompt" }}
      className={" mx-auto " + AdminStyle.bgImg}
    >
      <Head>
        <title>CatUs</title>
        <meta name="description" content="CatUs Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="2xl:flex 2xl:flex-wrap 2xl:justify-between 2xl:mx-64 pt-3">
        <Link href="/">
          <a>
            <h1 className="2xl:text-5xl 2xl:font-black 2xl:text-white 2xl:ml-16 2xl:mt-2">
              Catus<span className="2xl:text-base"> admin</span>
            </h1>
          </a>
        </Link>
      </header>
      <main>
        {openSeeMoreModal ? seeMoreModal : null}
        {openMoreInfoModal ? moreInfoModal : null}
        <section
          className="block-outer-head w-9/12 bg-white 2xl:h-36 mx-auto  rounded-t-2xl shadow-lg 2xl:mt-20"
          //   style={{ height: "880px" }}
        >
          <div className="2xl:absolute 2xl:ml-7 2xl:mt-12">
            <p className="dashboard-style 2xl:text-3xl 2xl:font-bold ">
              Dashboard
            </p>
          </div>
          <div
            className="dashboard-menu-style absolute "
            style={{ top: "245px" }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Report post" value="1" />
                    <Tab label="Active" value="2" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </div>
        </section>
        <section
          className="2xl:w-9/12 mx-auto bg-gray-100 rounded-b-2xl shadow-lg 2xl:grid"
          style={{ height: "1000px" }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <TabPanel value="1">
                <section>
                  <section
                    className="block-inner-head 2xl:w-4/5 bg-gray-50 2xl:h-36 mx-auto rounded-t-2xl shadow-lg 2xl:mt-16"
                    style={{ height: "95px" }}
                  >
                    <div className="header-style 2xl:grid 2xl:grid-cols-7 2xl:justify-items-stretch 2xl:gap-2 ">
                      <div className="post-style 2xl:col-span-3 2xl:m-7 2xl:mt-12">
                        Post
                      </div>

                      <div className="deleted-on-style 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Count
                      </div>
                      <div className="note-style 2xl:col-span-2 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Note
                      </div>
                      <div className="action-style 2xl:justify-self-center 2xl:m-7 2xl:mt-12">
                        Action
                      </div>
                    </div>
                  </section>
                  <section
                    className="block-inner-body 2xl:w-4/5 mx-auto bg-gray-100  shadow-lg 2xl:grid 2xl:grid-rows-5 2xl:gap-0.5"
                    style={{ height: "540px" }}
                  >
                    {currentReportPost.map((item, i) => (
                      <div
                        key={i}
                        className="item-style bg-white 2xl:grid 2xl:grid-cols-7 2xl:justify-items-stretch 2xl:gap-2 "
                      >
                        <div className="grid grid-flow-col grid-cols-3 col-span-3 ">
                          <div
                            className="justify-self-center cursor-pointer "
                            onClick={() => setSelectMoreInfoPost(i)}
                          >
                            <Image
                              src={item.image}
                              alt="catmockup"
                              width="110"
                              height="107"
                              key={i}
                            ></Image>
                          </div>
                          <div className="content-center   mx-3 grid col-span-3 text-sm ">
                            {/* {item.description.length < "93" ? item.description:"null"} */}
                            <div className="text-sm">
                              <p>Date: {item.date != "" ? item.date : "-"}</p>
                              <p>Sex: {item.sex != "" ? item.sex : "-"}</p>
                              <p>Colar: {item.collar ? "Have" : "Not Have"}</p>
                              {/* <p>Description: {item.description != "" ? item.description.length : "-"}</p> */}
                              <p>
                                Description:{" "}
                                {item.description != ""
                                  ? item.description.length >= 32
                                    ? item.description.substring(0, 30) +
                                      "......"
                                    : item.description
                                  : "-"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="place-self-center ">
                          {/* {Object.entries(item.reason).map(([key, value]) => {
                            let counter;
                            counter 
                            return (
                              <p key={key}>
                                {value}
                              </p>
                            );
                          })} */}
                          {/* {currentReportPost.reduce(function (accumulator, currentValue) {
                            return accumulator + currentValue.age;
                          }, 0)} */}

                          {/* {item.reduce((previousValue, currentValue) => previousValue + currentValue)} */}
                        </div>
                        <div
                          className="place-self-center col-span-2 text-sm text-blue-500 cursor-pointer"
                          onClick={() => setSelectReportPost(i)}
                        >
                          <p className="text-xs">ดูเพิ่มเติม</p>
                        </div>
                        <div className="place-self-center 2xl:relative">
                          <ThemeProvider theme={theme}>
                            <div className="2xl:absolute -top-8 -right-12">
                              <IconButton aria-label="delete" size="medium">
                                <p className="text-base text-gray-400">X</p>
                              </IconButton>
                            </div>
                            <div className="">
                              <IconButton aria-label="delete" color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </ThemeProvider>
                        </div>
                      </div>
                    ))}
                  </section>
                  <section
                    className="block-inner-foot 2xl:w-4/5 bg-gray-50 2xl:h-36 mx-auto  rounded-b-2xl shadow-lg 2xl:flex 2xl:justify-end "
                    style={{ height: "95px" }}
                  >
                    <div>
                      <Stack spacing={2}>
                        <Pagination
                          className="page-number 2xl:mt-10 justify-center"
                          count={maxPage}
                          page={page}
                          onChange={handleChangePage}
                        />
                      </Stack>
                    </div>
                  </section>
                </section>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Box>
        </section>
      </main>
      <footer>
        <section
          className="footer-orange 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:bg-mainBlue 2xl:mt-36"
          style={{ width: "100%", height: "259px" }}
        >
          <div className="2xl:flex 2xl:flex-wrap 2xl:gap-52">
            <div className="2xl:text-white">
              <p className="2xl:text-2xl">ติดต่อเรา</p>
              <p className="2xl:mt-1">+66 6071 2203</p>
              <p>catus_helpyou@sit.kmutt.ac.th</p>
              <p className="2xl:text-5xl 2xl:mt-2 2xl:font-black">Catus</p>
              <p className="2xl:text-gray-300">© Copyright 2021 CatUs</p>
            </div>
            <div className="2xl:text-white">
              <p className="2xl:text-2xl">สถานที่ทำการ</p>
              <p className="2xl:mt-1 2xl:-mb-1">
                Space Dragon 168 ซอยประชาอุทิศ 40 ถนนประชาอุทิศ แขวงบางมด
                เขตทุ่งครุ กรุงเทพมหานคร 10140
              </p>
              <p className="2xl:mt-20 2xl:text-gray-300">
                School of Information Technology, King Mongkut&apos;s University
                of Technology Thonburi
              </p>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
}
