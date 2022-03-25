const requestMock = {
  index: 'listings_production',
  body: {
    "query": {
      "bool": {
        "must": {
          "match_all": {}
        },
        "filter": [
          {
            "bool": {
              "should": []
            }
          },
          {
            "bool": {
              "should": [
                {
                  "bool": {
                    "filter": [
                      {
                        "bool": {
                          "should": [
                            {
                              "bool": {
                                "filter": [
                                  {
                                    "term": {
                                      "status": "Active"
                                    }
                                  },
                                  {
                                    "range": {
                                      "status_modified_at": {
                                        "from": "1922-04-15T13:48:53.681-03:00",
                                        "include_lower": true
                                      }
                                    }
                                  },
                                  {
                                    "term": {
                                      "provider_id": "bright_bright"
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "bool": {
                                "filter": [
                                  {
                                    "term": {
                                      "status": "Under Contract"
                                    }
                                  },
                                  {
                                    "range": {
                                      "status_modified_at": {
                                        "from": "1922-04-15T13:48:53.895-03:00",
                                        "include_lower": true
                                      }
                                    }
                                  },
                                  {
                                    "term": {
                                      "provider_id": "bright_bright"
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "bool": {
                                "filter": [
                                  {
                                    "term": {
                                      "status": "Pending"
                                    }
                                  },
                                  {
                                    "range": {
                                      "status_modified_at": {
                                        "from": "1922-04-15T13:48:53.897-03:00",
                                        "include_lower": true
                                      }
                                    }
                                  },
                                  {
                                    "term": {
                                      "provider_id": "bright_bright"
                                    }
                                  }
                                ]
                              }
                            },
                            {
                              "bool": {
                                "filter": [
                                  {
                                    "term": {
                                      "status": "Active Under Contract"
                                    }
                                  },
                                  {
                                    "range": {
                                      "status_modified_at": {
                                        "from": "1922-04-15T13:48:53.899-03:00",
                                        "include_lower": true
                                      }
                                    }
                                  },
                                  {
                                    "term": {
                                      "provider_id": "bright_bright"
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "geo_shape": {
              "shape": {
                "relation": "intersects",
                "shape": {
                  "type": "envelope",
                  "coordinates": [
                    [
                      -98.75177466979922,
                      51.74674085514271
                    ],
                    [
                      -36.261540294799225,
                      19.548375414117917
                    ]
                  ]
                }
              }
            }
          },
          {
            "bool": {
              "must_not": {
                "term": {
                  "lease_property": true
                }
              }
            }
          },
          {
            "terms": {
              "property_type": [
                "Residential",
                "Condo",
                "Town House",
                "Multi-family",
                "Land",
                "Other",
                "Residential",
                "Condo",
                "Town House",
                "Multi-family",
                "Land",
                "Other",
                "Condo / Town House"
              ]
            }
          }
        ]
      }
    },
    "sort": {
      "price": "asc",
      "listing_key": "asc"
    },
    "timeout": "11s",
    "size": 20,
    "from": 0
  }
};