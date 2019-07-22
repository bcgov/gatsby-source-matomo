import Axios from 'axios';

// Copyright © 2019 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2019-06-04.
//

/**
 *
 * @param {Object} gatsbyHelpers the standard gatsby helpers
 * @param {Function} gatsbyHelpers.getNodes
 * @param {Function} gatsbyHelpers.createNodeId
 * @param {Object} gatsbyHelpers.actions
 * @param {Object} options
 * @param {String} options.matomoApiToken
 * @param {String} options.matomoUrl
 * @param {String} options.siteId
 */
export const sourceNodes = async (gatsby, { matomoApiToken, matomoUrl, siteId, apiOptions }) => {
  const { period, date } = apiOptions;
  // working on a super implementation for version 0
  const url = `${matomoUrl}/index.php`;

  const data = {
    module: 'API',
    method: 'Actions.getPageUrls',
    idSubtable: 5,
    idSite: siteId,
    period: period || 'month',
    date: date || 'today',
    format: 'json',
    token_auth: matomoApiToken,
  };

  const response = await Axios.post(url, data);

  console.log(response.data);
  // $url .= "?module=API&method=UserCountry.getCountry";
  // VisitsSummary
  // .get (idSite, period, date, segment = '', columns = ''
  /**
   * $url .= "&idSite=62&period=month&date=today";
$url .= "&format=JSON&filter_limit=10";
$url .= "&token_auth=$token_auth";
   */
};
