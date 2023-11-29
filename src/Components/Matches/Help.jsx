import React from 'react'

function Help() {
  return (
    <div>

<Box
                    sx={{
                      width: "100%",
                      backgroundImage:
                        "radial-gradient(circle farthest-corner at 83.7% 4.3%,rgba(173,0,171,.72) 0,#0d3c71 90%)",
                    }}
                  >
                    <Box
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      className=""
                    >
                      {/* <Tabs
                        value={valueTab}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                        className="text-white"
                      >
                        <Tab
                          label={<span className="text-white">IFancy 1</span>}
                          {...a11yProps(0)}
                        />
                        <Tab
                          label={<span className="text-white">Meter</span>}
                          {...a11yProps(1)}
                        />
                        <Tab
                          label={<span className="text-white">Khado</span>}
                          {...a11yProps(2)}
                        />
                        <Tab
                          label={<span className="text-white">Odd Even</span>}
                          {...a11yProps(3)}
                        />
                        <Tab
                          label={<span className="text-white">Wicket</span>}
                          {...a11yProps(4)}
                        />
                        <Tab
                          label={<span className="text-white">Four</span>}
                          {...a11yProps(5)}
                        />
                        <Tab
                          label={<span className="text-white">Six</span>}
                          {...a11yProps(6)}
                        />

                        <Tab
                          label={
                            <span className="text-white">Cricket Casino</span>
                          }
                          {...a11yProps(7)}
                        />
                      </Tabs> */}
                    </Box>
                    <TabPanel value={valueTab} index={0}>
                      <div class="match_odds_table">
                        <div class="table-responsive-sm">
                          <table class="table table-borderless">
                            {t1 != 0 ? (
                              <tbody>
                                <tr>
                                  <td class="min_width">
                                    <div class="td1">
                                      <h4></h4>
                                      <p></p>
                                    </div>
                                  </td>
                                  <td class="td_width display">
                                    <div class="td_item tdbg1 dp">
                                      <h4></h4>
                                      <p></p>
                                    </div>
                                  </td>
                                  <td class="td_width display">
                                    <div class="td_item tdbg2 dp">
                                      <h4></h4>
                                      <p></p>
                                    </div>
                                  </td>
                                  <td class="td_width">
                                    <div class="td_item tdbg3">
                                      <h4>BACK</h4>
                                    </div>
                                  </td>
                                  <td class="td_width">
                                    <div class="td_item tdbg4">
                                      <h4>LAY</h4>
                                    </div>
                                  </td>
                                  <td class="td_width display">
                                    <div class="td_item tdbg5 dp">
                                      <h4></h4>
                                      <p></p>
                                    </div>
                                  </td>
                                  <td class="td_width display">
                                    <div class="td_item tdbg6 dp">
                                      <h4></h4>
                                      <p></p>
                                    </div>
                                  </td>
                                </tr>
                                {t1.status == "SUSPENDED" ? (
                                  <tr className="tr_data_2">{t1.status}</tr>
                                ) : (
                                  <></>
                                )}
                                <tr>
                                  <td class="min_width">
                                    <div class="td1">
                                      <h4>{C1N1}</h4>
                                      <p>{u1t1}</p>
                                    </div>
                                  </td>
                                  {t1.b3 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg1 tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.b3,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.b3}</h4>
                                        {t1.bs3 < 1000 ? (
                                          <p>{t1.bs3}</p>
                                        ) : (
                                          <p>{(t1.bs3 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp display">
                                      <div class="td_item tdbg1  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t1.b2 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg2  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.b2,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.b2}</h4>
                                        {t1.bs2 < 1000 ? (
                                          <p>{t1.bs2}</p>
                                        ) : (
                                          <p>{(t1.bs2 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp display">
                                      <div class="td_item tdbg1  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t1.b1 != 0.0 ? (
                                    <td class="td_width">
                                      <div
                                        class="td_item tdbg3"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.b1,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.b1}</h4>
                                        {t1.bs1 < 1000 ? (
                                          <p>{t1.bs1}</p>
                                        ) : (
                                          <p>{(t1.bs1 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp">
                                      <div class="td_item tdbg1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t1.l1 != 0.0 ? (
                                    <td class="td_width">
                                      <div
                                        class="td_item tdbg4"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.l1,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.l1}</h4>
                                        {t1.ls1 < 1000 ? (
                                          <p>{t1.ls1}</p>
                                        ) : (
                                          <p>{(t1.ls1 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1">
                                      <div class="td_item tdbg4">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t1.l2 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg5  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.l2,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.l2}</h4>
                                        {t1.ls2 < 1000 ? (
                                          <p>{t1.ls2}</p>
                                        ) : (
                                          <p>{(t1.ls2 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1 display">
                                      <div class="td_item tdbg4  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t1.l3 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg6  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t1.l3,
                                        //     C1N1,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t1.l3}</h4>
                                        {t1.ls3 < 1000 ? (
                                          <p>{t1.ls3}</p>
                                        ) : (
                                          <p>{(t1.ls3 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1 display">
                                      <div class="td_item tdbg4  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                                {t2.status == "SUSPENDED" ? (
                                  <tr className="tr_data_2">{t2.status}</tr>
                                ) : (
                                  <></>
                                )}
                                <tr>
                                  <td class="min_width">
                                    <div class="td1">
                                      <h4>{C2N2}</h4>
                                      <p>{u2t2}</p>
                                    </div>
                                  </td>
                                  {t2.b3 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg1 tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.b3,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.b3}</h4>
                                        {t2.bs3 < 1000 ? (
                                          <p>{t2.bs3}</p>
                                        ) : (
                                          <p>{(t2.bs3 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp display">
                                      <div class="td_item tdbg1  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t2.b2 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg2  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.b2,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.b2}</h4>
                                        {t2.bs2 < 1000 ? (
                                          <p>{t2.bs2}</p>
                                        ) : (
                                          <p>{(t2.bs2 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp display">
                                      <div class="td_item tdbg1  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t2.b1 != 0.0 ? (
                                    <td class="td_width">
                                      <div
                                        class="td_item tdbg3"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.b1,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "back"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.b1}</h4>
                                        {t2.bs1 < 1000 ? (
                                          <p>{t2.bs1}</p>
                                        ) : (
                                          <p>{(t2.bs1 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp">
                                      <div class="td_item tdbg1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t2.l1 != 0.0 ? (
                                    <td class="td_width">
                                      <div
                                        class="td_item tdbg4"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.l1,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.l1}</h4>
                                        {t2.ls1 < 1000 ? (
                                          <p>{t2.ls1}</p>
                                        ) : (
                                          <p>{(t2.ls1 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1 display">
                                      <div class="td_item tdbg4">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t2.l2 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg5  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.l2,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.l2}</h4>
                                        {t2.ls2 < 1000 ? (
                                          <p>{t2.ls2}</p>
                                        ) : (
                                          <p>{(t2.ls2 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1 display">
                                      <div class="td_item tdbg4  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                  {t2.l3 != 0.0 ? (
                                    <td class="td_width display">
                                      <div
                                        class="td_item tdbg6  tdw1"
                                        // onClick={() =>
                                        //   BetValue(
                                        //     t2.l3,
                                        //     C2N2,
                                        //     "MATCH_ODDS",
                                        //     "lay"
                                        //   )
                                        // }
                                      >
                                        <h4>{t2.l3}</h4>
                                        {t2.ls3 < 1000 ? (
                                          <p>{t2.ls3}</p>
                                        ) : (
                                          <p>{(t2.ls3 / 1000).toFixed(1)}K</p>
                                        )}
                                      </div>
                                    </td>
                                  ) : (
                                    <td class="td_width pp1 display">
                                      <div class="td_item tdbg4  tdw1">
                                        <h4></h4>
                                        <p></p>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            ) : (
                              <>
                                <p>No real-time records found</p>
                              </>
                            )}
                          </table>
                        </div>
                      </div>
                      {/* <!----===============Book maker row=================-----> */}
                      <div class="row">
                        <div class="col-md-7">
                          <div class="bars_bg">
                            <div class="row">
                              <div class="col-md-6 width1">
                                <div class="section_heading">
                                  <h2>Bookmaker Market 1</h2>
                                </div>
                              </div>
                              <div class="col-md-6 width2">
                                <div class="section_heading">
                                  <h3>
                                    <i
                                      class="fa fa-info-circle"
                                      onclick="openNav10()"
                                    ></i>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="match_odds_table">
                            <div class="table-responsive-sm">
                              <table class="col-md-6 table table-borderless">
                                {t4 != 0 ? (
                                  <tbody>
                                    <tr>
                                      <td class="min_width">
                                        <div class="td1">
                                          <h4 class="txt_color">
                                            Min: {Math.round(t3.min)} Max:{" "}
                                            {Math.round(t3.max / 100000)}L
                                          </h4>
                                        </div>
                                      </td>
                                      <td class="td_width display">
                                        <div class="td_item tdbg1 dp">
                                          <h4></h4>
                                        </div>
                                      </td>
                                      <td class="td_width display">
                                        <div class="td_item tdbg2 dp">
                                          <h4></h4>
                                        </div>
                                      </td>
                                      <td class="td_width">
                                        <div class="td_item tdbg3">
                                          <h4>BACK</h4>
                                        </div>
                                      </td>
                                      <td class="td_width">
                                        <div class="td_item tdbg4">
                                          <h4>LAY</h4>
                                        </div>
                                      </td>
                                      <td class="td_width display">
                                        <div class="td_item tdbg5 dp">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                      <td class="td_width display">
                                        <div class="td_item tdbg6 dp">
                                          <h4></h4>
                                          <p></p>
                                        </div>
                                      </td>
                                    </tr>
                                    {t4.s == "SUSPENDED" ? (
                                      <tr className="tr_data">{t4.s}</tr>
                                    ) : (
                                      <></>
                                    )}
                                    <tr>
                                      {/* <td className="tr_data"></td> */}
                                      <td class="min_width">
                                        <div class="td1">
                                          <h4>{C2N3}</h4>
                                          <p>{u2t3}</p>
                                        </div>
                                      </td>

                                      {t4.b3 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg1"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.b3,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.bs1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.b3}</h4>
                                            <p>
                                              {Math.round(t4.bs3 / 100000)}L
                                            </p>
                                          </div>{" "}
                                        </td>
                                      ) : (
                                        <td class="td_width pp display">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t4.b2 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg2"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.b2,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.bs1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.b2}</h4>
                                            <p>
                                              {Math.round(t4.bs2 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp display">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t4.b1 != 0.0 ? (
                                        <td class="td_width">
                                          <div
                                            class="td_item tdbg3"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.b1,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.bs1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.b1}</h4>
                                            <p>
                                              {Math.round(t4.bs1 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t4.l1 != 0.0 ? (
                                        <td class="td_width">
                                          <div
                                            class="td_item tdbg4"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.l1,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.l1}</h4>
                                            <p>
                                              {Math.round(t4.ls1 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t4.l2 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg5"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.l2,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.l2}</h4>
                                            <p>
                                              {Math.round(t4.ls2 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1 display">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t4.l3 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg6"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t4.l3,
                                            //     C2N3,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t4.sid,
                                            //     t4.sr,
                                            //     0,
                                            //     t4.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t4.l3}</h4>
                                            <p>
                                              {Math.round(t4.ls3 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1 display">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                    {t3.s == "SUSPENDED" ? (
                                      <tr className="tr_data">{t3.s}</tr>
                                    ) : (
                                      <></>
                                    )}
                                    <tr>
                                      <td class="min_width">
                                        <div class="td1">
                                          <h4>{C2N1}</h4>
                                          <p>{u2t1}</p>
                                        </div>
                                      </td>
                                      {t3.b3 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg1"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.b3,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.b3}</h4>
                                            <p>
                                              {Math.round(t3.bs3 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp display">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t3.b2 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg2"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.b2,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.bs1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.b2}</h4>
                                            <p>
                                              {Math.round(t3.bs2 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp display">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t3.b1 != 0.0 ? (
                                        <td class="td_width">
                                          <div
                                            class="td_item tdbg3"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.b1,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "back",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.bs1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.b1}</h4>
                                            <p>
                                              {Math.round(t3.bs1 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp">
                                          <div class="td_item tdbg1">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t3.l1 != 0.0 ? (
                                        <td class="td_width">
                                          <div
                                            class="td_item tdbg4"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.l1,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.l1}</h4>
                                            <p>
                                              {Math.round(t3.ls1 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t3.l2 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg5"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.l2,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.l2}</h4>
                                            <p>
                                              {Math.round(t3.ls2 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1 display">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                      {t3.l3 != 0.0 ? (
                                        <td class="td_width display">
                                          <div
                                            class="td_item tdbg6"
                                            // onClick={() =>
                                            //   BetValue(
                                            //     t3.l3,
                                            //     C2N1,
                                            //     "Bookmaker Market 1",
                                            //     "lay",
                                            //     t3.sid,
                                            //     t3.sr,
                                            //     0,
                                            //     t3.ls1
                                            //   )
                                            // }
                                          >
                                            <h4>{t3.l3}</h4>
                                            <p>
                                              {Math.round(t3.ls3 / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      ) : (
                                        <td class="td_width pp1 display">
                                          <div class="td_item tdbg4">
                                            <h4></h4>
                                            <p></p>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  </tbody>
                                ) : (
                                  <>
                                    <p>No real-time records found</p>
                                  </>
                                )}
                              </table>
                            </div>
                            <div class="match_discription">
                              <p>{remark1}</p>
                            </div>
                          </div>
                        </div>
                        {t5.length != "0" ? (
                          <div class="col-md-5">
                            <div class="bars_bg">
                              <div class="row">
                                <div class="col-md-9 width1">
                                  <div class="section_heading">
                                    <h2>Bookmaker Market 2</h2>
                                  </div>
                                </div>
                                <div class="col-md-3 width2">
                                  <div class="section_heading">
                                    <h3>
                                      <i
                                        class="fa fa-info-circle"
                                        onclick="openNav10()"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="match_odds_table">
                              <div class="table-responsive-sm">
                                <table class="table table-borderless">
                                  {t6 != 0 ? (
                                    <tbody>
                                      <tr>
                                        <td class="min_width ">
                                          <div class="td1">
                                            <h4 class="txt_color">
                                              Min:{Math.round(t6.min)}
                                              <br />
                                              Max:{Math.round(t6.max / 100000)}L
                                            </h4>
                                          </div>
                                        </td>

                                        <td class="td_width">
                                          <div class="td_item tdbg3">
                                            <h4>BACK</h4>
                                          </div>
                                        </td>
                                        <td class="td_width">
                                          <div class="td_item tdbg4">
                                            <h4>LAY</h4>
                                          </div>
                                        </td>
                                        <td class="td_width">
                                          <div class="td_item bd">
                                            <h4>&nbsp;</h4>
                                          </div>
                                        </td>
                                      </tr>
                                      {t6.s == "SUSPENDED" ? (
                                        <tr className="tr_data_1">{t6.s}</tr>
                                      ) : (
                                        <></>
                                      )}
                                      <tr>
                                        <td class="min_width">
                                          <div class="td1">
                                            <h4>{C2N5}</h4>
                                            <p>{u2t5}</p>
                                          </div>
                                        </td>
                                        {t6.b1 != 0.0 ? (
                                          <td class="td_width">
                                            <div
                                              class="td_item tdbg3"
                                              onClick={() =>
                                                BetValue(
                                                  t6.b1,
                                                  C2N5,
                                                  "Bookmaker Market 2",
                                                  "back",
                                                  t6.sid,
                                                  t6.sr,
                                                  0,
                                                  t6.ls1
                                                )
                                              }
                                            >
                                              <h4>{Math.round(t6.b1)}</h4>
                                              <p>
                                                {Math.round(t6.bs1 / 100000)}L
                                              </p>
                                            </div>
                                          </td>
                                        ) : (
                                          <td class="td_width pp1">
                                            <div class="td_item tdbg1">
                                              <h4></h4>
                                              <p></p>
                                            </div>
                                          </td>
                                        )}
                                        {t6.l1 != 0.0 ? (
                                          <td class="td_width">
                                            <div
                                              class="td_item tdbg4"
                                              onClick={() =>
                                                BetValue(
                                                  t6.l1,
                                                  C2N5,
                                                  "Bookmaker Market 2",
                                                  "lay",
                                                  t6.sid,
                                                  t6.sr,
                                                  0,
                                                  t6.bs1
                                                )
                                              }
                                            >
                                              <h4>{Math.round(t6.l1)}</h4>
                                              <p>
                                                {Math.round(t6.ls1 / 100000)}L
                                              </p>
                                            </div>
                                          </td>
                                        ) : (
                                          <td class="td_width pp1">
                                            <div class="td_item tdbg4">
                                              <h4></h4>
                                              <p></p>
                                            </div>
                                          </td>
                                        )}
                                        <td class="td_width display">
                                          <div class="td_item bd">
                                            <h4>Min:{Math.round(t6.min)}</h4>
                                            <p>
                                              Max:{Math.round(t6.max / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      {t5.s == "SUSPENDED" ? (
                                        <tr className="tr_data_1">{t5.s}</tr>
                                      ) : (
                                        <></>
                                      )}
                                      <tr>
                                        <td class="min_width">
                                          <div class="td1">
                                            <h4>{C2N4}</h4>
                                            <p>{u2t4}</p>
                                          </div>
                                        </td>
                                        {t5.b1 != 0.0 ? (
                                          <td class="td_width">
                                            <div
                                              class="td_item tdbg3"
                                              onClick={() =>
                                                BetValue(
                                                  t5.b1,
                                                  C2N4,
                                                  "Bookmaker Market 2",
                                                  "back",
                                                  t5.sid,
                                                  t5.sr,
                                                  0,
                                                  t5.ls1
                                                )
                                              }
                                            >
                                              <h4>{Math.round(t5.b1)}</h4>
                                              <p>
                                                {Math.round(t5.bs1 / 100000)}L
                                              </p>
                                            </div>
                                          </td>
                                        ) : (
                                          <td class="td_width pp1">
                                            <div class="td_item tdbg1">
                                              <h4></h4>
                                              <p></p>
                                            </div>
                                          </td>
                                        )}
                                        {t5.l1 != 0.0 ? (
                                          <td class="td_width">
                                            <div
                                              class="td_item tdbg4"
                                              onClick={() =>
                                                BetValue(
                                                  t5.l1,
                                                  C2N4,
                                                  "Bookmaker Market 2",
                                                  "lay",
                                                  t5.sid,
                                                  t5.sr,
                                                  0,
                                                  t5.bs1
                                                )
                                              }
                                            >
                                              <h4>{Math.round(t5.l1)}</h4>
                                              <p>
                                                {Math.round(t5.ls1 / 100000)}L
                                              </p>
                                            </div>
                                          </td>
                                        ) : (
                                          <td class="td_width pp1">
                                            <div class="td_item tdbg4">
                                              <h4></h4>
                                              <p></p>
                                            </div>
                                          </td>
                                        )}
                                        <td class="td_width display">
                                          <div class="td_item bd">
                                            <h4>Min:{Math.round(t5.min)}</h4>
                                            <p>
                                              Max:{Math.round(t5.max / 100000)}L
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>No real-time records found</p>
                                    </>
                                  )}
                                </table>
                              </div>
                              <div class="match_discription">
                                <p>{remark2}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* <!----===============session market row=================-----> */}
                      <div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="bars_bg">
                              <div class="row">
                                <div class="col-md-6 width1">
                                  <div class="section_heading">
                                    <h2>Session Market</h2>
                                  </div>
                                </div>
                                <div class="col-md-6 width2">
                                  <div class="section_heading">
                                    <h3>
                                      <i
                                        class="fa fa-info-circle"
                                        onclick="openNav10()"
                                      ></i>
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="match_odds_table">
                              <div class="table-responsive-sm">
                                <table class="table table-borderless">
                                  {data ? (
                                    <tbody>
                                      <tr>
                                        <td class="min_width">
                                          <div class="td1">
                                            <h4>&nbsp;</h4>
                                          </div>
                                        </td>
                                        <td class="min_width">
                                          <div class="td1">
                                            <h4>&nbsp;</h4>
                                          </div>
                                        </td>

                                        <td class="td_width">
                                          <div class="td_item tdbg4">
                                            <h4>No</h4>
                                          </div>
                                        </td>
                                        <td class="td_width">
                                          <div class="td_item tdbg3">
                                            <h4>Yes</h4>
                                          </div>
                                        </td>
                                        <td class="td_width display">
                                          <div class="td_item bd">
                                            <h4>&nbsp;</h4>
                                          </div>
                                        </td>
                                      </tr>

                                      {data?.map((item, index) => {
                                        if (item.ballsess == "1") {
                                          return (
                                            <tr>
                                              <tr>
                                                {item.gstatus == "SUSPENDED" ? (
                                                  <tr className=" tr_data_3">
                                                    {item.gstatus}
                                                  </tr>
                                                ) : item.gstatus ==
                                                  "Ball Running" ? (
                                                  <>
                                                    {" "}
                                                    <tr className=" tr_data_3">
                                                      {item.gstatus}
                                                    </tr>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </tr>
                                              <td class="min_width">
                                                <div class="td1">
                                                  <h4>{item.nat}</h4>
                                                  <p>{item.utime}</p>
                                                </div>
                                              </td>
                                              {item.l1 != 0.0 ? (
                                                <td class="td_width">
                                                  <div
                                                    class="td_item tdbg4"
                                                    onClick={() =>
                                                      BetValue(
                                                        item.l1,
                                                        item.nat,
                                                        "Session Market",
                                                        "lay",
                                                        item.sid,
                                                        item.srno,
                                                        item.ballsess,
                                                        item.ls1
                                                      )
                                                    }
                                                  >
                                                    <h4>
                                                      {Math.round(item.l1)}
                                                    </h4>
                                                    <p>
                                                      {Math.round(item.ls1)}
                                                    </p>
                                                  </div>
                                                </td>
                                              ) : (
                                                <td class="td_width pp1">
                                                  <div class="td_item tdbg4">
                                                    <h4></h4>
                                                    <p></p>
                                                  </div>
                                                </td>
                                              )}
                                              {item.b1 != 0.0 ? (
                                                <td class="td_width">
                                                  <div
                                                    class="td_item tdbg3"
                                                    onClick={() =>
                                                      BetValue(
                                                        item.b1,
                                                        item.nat,
                                                        "Session Market",
                                                        "back",
                                                        item.sid,
                                                        item.srno,
                                                        item.ballsess,
                                                        item.bs1
                                                      )
                                                    }
                                                  >
                                                    <h4>
                                                      {Math.round(item.b1)}
                                                    </h4>
                                                    <p>
                                                      {Math.round(item.bs1)}
                                                    </p>
                                                  </div>
                                                </td>
                                              ) : (
                                                <td class="td_width pp">
                                                  <div class="td_item tdbg1">
                                                    <h4></h4>
                                                    <p></p>
                                                  </div>
                                                </td>
                                              )}
                                              <td class="td_width display">
                                                <div class="td_item bd">
                                                  <h4>
                                                    Min:{Math.round(item.min)}
                                                  </h4>
                                                  <p>
                                                    Max:
                                                    {Math.round(
                                                      item.max / 1000
                                                    )}
                                                    K
                                                  </p>
                                                </div>
                                              </td>
                                            </tr>
                                          );
                                        } else {
                                          return null; // Return null if age is less than or equal to 18
                                        }
                                      })}
                                    </tbody>
                                  ) : (
                                    <>
                                      {" "}
                                      <p>No real-time records found</p>
                                    </>
                                  )}
                                </table>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="bars_bg">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <div class="section_heading">
                                        <h2>Over by Over Session Market</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="match_odds_table">
                                  <div class="table-responsive-sm">
                                    <table class="table table-borderless">
                                      {data ? (
                                        <tbody>
                                          <tr>
                                            <td class="min_width">
                                              <div class="td1">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>
                                            <td class="min_width">
                                              <div class="td1">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>
                                            <td class="td_width">
                                              <div class="td_item tdbg4 rc1">
                                                <h4>No</h4>
                                              </div>
                                            </td>
                                            <td class="td_width">
                                              <div class="td_item tdbg3">
                                                <h4>Yes</h4>
                                              </div>
                                            </td>
                                            <td class="td_width display">
                                              <div class="td_item bd">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>
                                          </tr>

                                          {data?.map((item, index) => {
                                            if (item.ballsess == "2") {
                                              return (
                                                <tr>
                                                  <tr>
                                                    {item.gstatus ==
                                                    "SUSPENDED" ? (
                                                      <tr className="tr_data_3">
                                                        {item.gstatus}
                                                      </tr>
                                                    ) : item.gstatus ==
                                                      "Ball Running" ? (
                                                      <>
                                                        {" "}
                                                        <tr className="tr_data_3">
                                                          {item.gstatus}
                                                        </tr>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </tr>
                                                  <td class="min_width">
                                                    <div class="td1">
                                                      <h4>{item.nat}</h4>
                                                      <p>{item.utime}</p>
                                                    </div>
                                                  </td>
                                                  {item.l1 != 0.0 ? (
                                                    <td class="td_width">
                                                      <div
                                                        class="td_item tdbg4"
                                                        onClick={() =>
                                                          BetValue(
                                                            item.l1,
                                                            item.nat,
                                                            "Over by Over Session Market",
                                                            "lay",
                                                            item.sid,
                                                            item.srno,
                                                            item.ballsess,
                                                            item.ls1
                                                          )
                                                        }
                                                      >
                                                        <h4>
                                                          {Math.round(item.l1)}
                                                        </h4>
                                                        <p>
                                                          {Math.round(item.ls1)}
                                                        </p>

                                                        {/* <h4>{item.b1}</h4>
                                                    <p>{item.bs1}</p> */}
                                                      </div>
                                                    </td>
                                                  ) : (
                                                    <td class="td_width pp">
                                                      <div class="td_item tdbg1">
                                                        <h4></h4>
                                                        <p></p>
                                                      </div>
                                                    </td>
                                                  )}
                                                  {item.b1 != 0.0 ? (
                                                    <td class="td_width">
                                                      <div
                                                        class="td_item tdbg3"
                                                        onClick={() =>
                                                          BetValue(
                                                            item.b1,
                                                            item.nat,
                                                            "Over by Over Session Market",
                                                            "back",
                                                            item.sid,
                                                            item.srno,
                                                            item.ballsess,
                                                            item.bs1
                                                          )
                                                        }
                                                      >
                                                        <h4>
                                                          {Math.round(item.b1)}
                                                        </h4>
                                                        <p>
                                                          {Math.round(item.bs1)}
                                                        </p>

                                                        {/* <h4>{item.l1}</h4>
                                                    <p>{item.ls1}</p> */}
                                                      </div>
                                                    </td>
                                                  ) : (
                                                    <td class="td_width pp1">
                                                      <div class="td_item tdbg4">
                                                        <h4></h4>
                                                        <p></p>
                                                      </div>
                                                    </td>
                                                  )}
                                                  <td class="td_width display">
                                                    <div class="td_item bd">
                                                      <h4>
                                                        Min:
                                                        {Math.round(item.min)}
                                                      </h4>
                                                      <p>
                                                        Max:
                                                        {Math.round(
                                                          item.max / 1000
                                                        )}
                                                        K
                                                      </p>
                                                    </div>
                                                  </td>
                                                </tr>
                                              );
                                            } else {
                                              return null; // Return null if age is less than or equal to 18
                                            }
                                          })}
                                        </tbody>
                                      ) : (
                                        <>
                                          {" "}
                                          <p>No real-time records found</p>
                                        </>
                                      )}
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div class="bars_bg">
                                  <div class="row">
                                    <div class="col-md-12">
                                      <div class="section_heading">
                                        <h2>Ball by Ball Session Market</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="match_odds_table">
                                  <div class="table-responsive-sm">
                                    <table class="table table-borderless">
                                      {data ? (
                                        <tbody>
                                          <tr>
                                            <td class="min_width">
                                              <div class="td1">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>

                                            <td class="min_width">
                                              <div class="td1">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>

                                            <td class="td_width">
                                              <div class="td_item tdbg4 rc1">
                                                <h4>No</h4>
                                              </div>
                                            </td>
                                            <td class="td_width">
                                              <div class="td_item tdbg3">
                                                <h4>Yes</h4>
                                              </div>
                                            </td>
                                            <td class="td_width display">
                                              <div class="td_item bd">
                                                <h4>&nbsp;</h4>
                                              </div>
                                            </td>
                                          </tr>
                                          {data?.map((item, index) => {
                                            if (item.ballsess == "3") {
                                              return (
                                                <tr>
                                                  <tr>
                                                    {item.gstatus ==
                                                    "SUSPENDED" ? (
                                                      <tr className="tr_data_4">
                                                        {item.gstatus}
                                                      </tr>
                                                    ) : item.gstatus ==
                                                      "Ball Running" ? (
                                                      <>
                                                        {" "}
                                                        <tr className="tr_data_4">
                                                          {item.gstatus}
                                                        </tr>
                                                      </>
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </tr>
                                                  <td class="min_width">
                                                    <div class="td1">
                                                      <h4>{item.nat}</h4>
                                                      <p>{item.utime}</p>
                                                    </div>
                                                  </td>
                                                  {item.b1 != 0.0 ? (
                                                    <td class="td_width">
                                                      <div
                                                        class="td_item tdbg4"
                                                        onClick={() =>
                                                          BetValue(
                                                            item.b1,
                                                            item.nat,
                                                            "Ball by Ball Session Market",
                                                            "lay",
                                                            item.sid,
                                                            item.srno,
                                                            item.ballsess,
                                                            item.ls1
                                                          )
                                                        }
                                                      >
                                                        <h4>
                                                          {Math.round(item.b1)}
                                                        </h4>
                                                        <p>
                                                          {Math.round(item.bs1)}
                                                        </p>
                                                      </div>
                                                    </td>
                                                  ) : (
                                                    <td class="td_width pp">
                                                      <div class="td_item tdbg4">
                                                        <h4></h4>
                                                        <p></p>
                                                      </div>
                                                    </td>
                                                  )}
                                                  {item.l1 != 0.0 ? (
                                                    <td class="td_width">
                                                      <div
                                                        class="td_item tdbg3"
                                                        onClick={() =>
                                                          BetValue(
                                                            item.l1,
                                                            item.nat,
                                                            "Ball by Ball Session Market",
                                                            "back",
                                                            item.sid,
                                                            item.srno,
                                                            item.ballsess,
                                                            item.bs1
                                                          )
                                                        }
                                                      >
                                                        <h4>
                                                          {Math.round(item.l1)}
                                                        </h4>
                                                        <p>
                                                          {Math.round(item.ls1)}
                                                        </p>
                                                      </div>
                                                    </td>
                                                  ) : (
                                                    <td class="td_width pp1">
                                                      <div class="td_item tdbg1">
                                                        <h4></h4>
                                                        <p></p>
                                                      </div>
                                                    </td>
                                                  )}
                                                  <td class="td_width display">
                                                    <div class="td_item bd">
                                                      <h4>
                                                        Min:
                                                        {Math.round(item.min)}
                                                      </h4>
                                                      <p>
                                                        Max:
                                                        {Math.round(
                                                          item.max / 1000
                                                        )}
                                                        K
                                                      </p>
                                                    </div>
                                                  </td>
                                                </tr>
                                              );
                                            } else {
                                              return null; // Return null if age is less than or equal to 18
                                            }
                                          })}
                                        </tbody>
                                      ) : (
                                        <>
                                          {" "}
                                          <p>No real-time records found</p>
                                        </>
                                      )}
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <Accordion_Matches TeamOne={liveScore.spnnation1} teamTwo={liveScore.spnnation2} /> */}

                        {/* <div class="row">
                          <div class="col-md-12">
                            <div class=" tab-content_bg">
                              <ul class="nav nav-pills" role="tablist">
                                <li class="nav-item">
                                  <a
                                    class="nav-link active"
                                    data-toggle="pill"
                                    href="#Home1"
                                  >
                                    Fancy 1
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home2"
                                  >
                                    Meter
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home3"
                                  >
                                    Khado
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home4"
                                  >
                                    Odd Even
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home5"
                                  >
                                    Wicket
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home6"
                                  >
                                    Four
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home7"
                                  >
                                    Six
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home8"
                                  >
                                    Cricket Casino
                                  </a>
                                </li>
                              </ul>
                             
                              <div class="tab-content">
                                <div
                                  id="Home1"
                                  class="container tab-pane active"
                                >
                                  <div class="row">
                                    <div class="col-md-7">
                                      <div class="bars_bg">
                                        <div class="row">
                                          <div class="col-md-6">
                                            <div class="section_heading">
                                              <h2>Fancy 1</h2>
                                            </div>
                                          </div>
                                          <div class="col-md-6">
                                            <div class="section_heading">
                                              <h3>
                                                <i
                                                  class="fa fa-info-circle"
                                                  onclick="openNav10()"
                                                ></i>
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="match_odds_table">
                                        <div class="table-responsive-sm">
                                          <table class="table table-borderless">
                                            {fancy ? (
                                              <tbody>
                                                <tr>
                                                  <td class="min_width">
                                                    <div class="td1">
                                                      <h4>&nbsp;</h4>
                                                    </div>
                                                  </td>

                                                  <td class="td_width">
                                                    <div class="td_item tdbg4">
                                                      <h4>Lay</h4>
                                                    </div>
                                                  </td>
                                                  <td class="td_width">
                                                    <div class="td_item tdbg3">
                                                      <h4>Back</h4>
                                                    </div>
                                                  </td>
                                                  <td class="td_width">
                                                    <div class="td_item">
                                                      <h4>&nbsp;</h4>
                                                    </div>
                                                  </td>
                                                </tr>
                                                {fancy.map((item, index) => {
                                                  if (item.gtype == "fancy1") {
                                                    return (
                                                      <tr>
                                                        <td class="min_width">
                                                          <div class="td1">
                                                            <h4>{item.nat}</h4>
                                                            <p>{item.utime}</p>
                                                          </div>
                                                        </td>
                                                        {item.b1 != 0.0 ? (
                                                          <td class="td_width">
                                                            <div
                                                              class="td_item tdbg4"
                                                              onClick={() =>
                                                                BetValue(
                                                                  item.b1,
                                                                  item.nat,
                                                                  "Fancy 1",
                                                                  "lay"
                                                                )
                                                              }
                                                            >
                                                              <h4>
                                                                {Math.round(
                                                                  item.b1
                                                                )}
                                                              </h4>
                                                              <p>
                                                                {Math.round(
                                                                  item.bs1 /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        ) : (
                                                          <td class="td_width pp1">
                                                            <div class="td_item tdbg4">
                                                              <h4></h4>
                                                              <p></p>
                                                            </div>
                                                          </td>
                                                        )}
                                                        {item.l1 != 0.0 ? (
                                                          <td class="td_width">
                                                            <div
                                                              class="td_item tdbg3"
                                                              onClick={() =>
                                                                BetValue(
                                                                  item.l1,
                                                                  item.nat,
                                                                  "Fancy 1",
                                                                  "back"
                                                                )
                                                              }
                                                            >
                                                              <h4>
                                                                {Math.round(
                                                                  item.l1
                                                                )}
                                                              </h4>
                                                              <p>
                                                                {Math.round(
                                                                  item.ls1 /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        ) : (
                                                          <td class="td_width pp">
                                                            <div class="td_item tdbg4">
                                                              <h4></h4>
                                                              <p></p>
                                                            </div>
                                                          </td>
                                                        )}
                                                        <td class="td_width">
                                                          <div class="td_item">
                                                            <h4>
                                                              Min:
                                                              {Math.round(
                                                                item.min
                                                              )}
                                                            </h4>
                                                            <p>
                                                              Max:
                                                              {Math.round(
                                                                item.max / 1000
                                                              )}
                                                              K
                                                            </p>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    );
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </tbody>
                                            ) : (
                                              <></>
                                            )}
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div id="Home2" class="container tab-pane fade">
                                  <br />
                                  <h3>Home2</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home3" class="container tab-pane fade">
                                  <br />
                                  <h3>Home3</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home4" class="container tab-pane fade">
                                  <br />
                                  <h3>Home4</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home5" class="container tab-pane fade">
                                  <br />
                                  <h3>Home5</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home6" class="container tab-pane fade">
                                  <br />
                                  <h3>Home6</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home7" class="container tab-pane fade">
                                  <br />
                                  <h3>Home7</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home8" class="container tab-pane fade">
                                  <br />
                                  <h3>Home8</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </TabPanel>
                    <TabPanel value={valueTab} index={1}>
                      Item Two
                    </TabPanel>
                    <TabPanel value={valueTab} index={2}>
                      Item Three
                    </TabPanel>
                  </Box>






                  
                      {/* <Accordion_Matches TeamOne={liveScore.spnnation1} teamTwo={liveScore.spnnation2} /> */}

                      {/* <div class="row">
                          <div class="col-md-12">
                            <div class=" tab-content_bg">
                              <ul class="nav nav-pills" role="tablist">
                                <li class="nav-item">
                                  <a
                                    class="nav-link active"
                                    data-toggle="pill"
                                    href="#Home1"
                                  >
                                    Fancy 1
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home2"
                                  >
                                    Meter
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home3"
                                  >
                                    Khado
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home4"
                                  >
                                    Odd Even
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home5"
                                  >
                                    Wicket
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home6"
                                  >
                                    Four
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home7"
                                  >
                                    Six
                                  </a>
                                </li>
                                <li class="nav-item">
                                  <a
                                    class="nav-link"
                                    data-toggle="pill"
                                    href="#Home8"
                                  >
                                    Cricket Casino
                                  </a>
                                </li>
                              </ul>
                             
                              <div class="tab-content">
                                <div
                                  id="Home1"
                                  class="container tab-pane active"
                                >
                                  <div class="row">
                                    <div class="col-md-7">
                                      <div class="bars_bg">
                                        <div class="row">
                                          <div class="col-md-6">
                                            <div class="section_heading">
                                              <h2>Fancy 1</h2>
                                            </div>
                                          </div>
                                          <div class="col-md-6">
                                            <div class="section_heading">
                                              <h3>
                                                <i
                                                  class="fa fa-info-circle"
                                                  onclick="openNav10()"
                                                ></i>
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="match_odds_table">
                                        <div class="table-responsive-sm">
                                          <table class="table table-borderless">
                                            {fancy ? (
                                              <tbody>
                                                <tr>
                                                  <td class="min_width">
                                                    <div class="td1">
                                                      <h4>&nbsp;</h4>
                                                    </div>
                                                  </td>

                                                  <td class="td_width">
                                                    <div class="td_item tdbg4">
                                                      <h4>Lay</h4>
                                                    </div>
                                                  </td>
                                                  <td class="td_width">
                                                    <div class="td_item tdbg3">
                                                      <h4>Back</h4>
                                                    </div>
                                                  </td>
                                                  <td class="td_width">
                                                    <div class="td_item">
                                                      <h4>&nbsp;</h4>
                                                    </div>
                                                  </td>
                                                </tr>
                                                {fancy.map((item, index) => {
                                                  if (item.gtype == "fancy1") {
                                                    return (
                                                      <tr>
                                                        <td class="min_width">
                                                          <div class="td1">
                                                            <h4>{item.nat}</h4>
                                                            <p>{item.utime}</p>
                                                          </div>
                                                        </td>
                                                        {item.b1 != 0.0 ? (
                                                          <td class="td_width">
                                                            <div
                                                              class="td_item tdbg4"
                                                              onClick={() =>
                                                                BetValue(
                                                                  item.b1,
                                                                  item.nat,
                                                                  "Fancy 1",
                                                                  "lay"
                                                                )
                                                              }
                                                            >
                                                              <h4>
                                                                {Math.round(
                                                                  item.b1
                                                                )}
                                                              </h4>
                                                              <p>
                                                                {Math.round(
                                                                  item.bs1 /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        ) : (
                                                          <td class="td_width pp1">
                                                            <div class="td_item tdbg4">
                                                              <h4></h4>
                                                              <p></p>
                                                            </div>
                                                          </td>
                                                        )}
                                                        {item.l1 != 0.0 ? (
                                                          <td class="td_width">
                                                            <div
                                                              class="td_item tdbg3"
                                                              onClick={() =>
                                                                BetValue(
                                                                  item.l1,
                                                                  item.nat,
                                                                  "Fancy 1",
                                                                  "back"
                                                                )
                                                              }
                                                            >
                                                              <h4>
                                                                {Math.round(
                                                                  item.l1
                                                                )}
                                                              </h4>
                                                              <p>
                                                                {Math.round(
                                                                  item.ls1 /
                                                                    1000
                                                                )}
                                                                K
                                                              </p>
                                                            </div>
                                                          </td>
                                                        ) : (
                                                          <td class="td_width pp">
                                                            <div class="td_item tdbg4">
                                                              <h4></h4>
                                                              <p></p>
                                                            </div>
                                                          </td>
                                                        )}
                                                        <td class="td_width">
                                                          <div class="td_item">
                                                            <h4>
                                                              Min:
                                                              {Math.round(
                                                                item.min
                                                              )}
                                                            </h4>
                                                            <p>
                                                              Max:
                                                              {Math.round(
                                                                item.max / 1000
                                                              )}
                                                              K
                                                            </p>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    );
                                                  } else {
                                                    return null;
                                                  }
                                                })}
                                              </tbody>
                                            ) : (
                                              <></>
                                            )}
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div id="Home2" class="container tab-pane fade">
                                  <br />
                                  <h3>Home2</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home3" class="container tab-pane fade">
                                  <br />
                                  <h3>Home3</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home4" class="container tab-pane fade">
                                  <br />
                                  <h3>Home4</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home5" class="container tab-pane fade">
                                  <br />
                                  <h3>Home5</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home6" class="container tab-pane fade">
                                  <br />
                                  <h3>Home6</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home7" class="container tab-pane fade">
                                  <br />
                                  <h3>Home7</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                                <div id="Home8" class="container tab-pane fade">
                                  <br />
                                  <h3>Home8</h3>
                                  <p>
                                    Sed ut perspiciatis unde omnis iste natus
                                    error sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

    </div>
  )
}

export default Help