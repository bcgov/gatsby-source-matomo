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
 * @param {Function} gatsbyHelpers.createContentDigest
 * @param {Function} gatsbyHelpers.createNodeId
 * @param {Object} gatsbyHelpers.actions
 * @param {Object} options
 * @param {String} options.matomoApiToken
 * @param {String} options.matomoUrl
 * @param {String} options.siteId
 */
export const sourceNodes = async (
  { createNodeId, actions, createContentDigest },
  { matomoApiToken, matomoUrl, siteId, apiOptions = {} },
) => {
  const { createNode } = actions;
  const defaultApiOptions = {
    period: 'month',
    date: 'today',
  };

  const options = {
    ...defaultApiOptions,
    ...apiOptions,
  };
  // working on a super implementation for version 0
  const url = `${matomoUrl}/index.php`;

  const params = {
    module: 'API',
    method: 'Actions.getPageUrls',
    idSubtable: 5,
    idSite: siteId,
    format: 'json',
    token_auth: matomoApiToken,
    ...options,
  };

  const response = await Axios.post(url, null, { params: params });

  // loop over page results and create nodes
  response.data.forEach(page => {
    const pageString = JSON.stringify(page);
    const id = createNodeId(pageString);

    createNode({
      ...page,
      id,
      parent: null,
      internal: {
        type: 'MatomoPageStats',
        children: [],
        contentDigest: createContentDigest(page),
        content: pageString,
      },
    });
  });
};
