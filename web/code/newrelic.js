'use strict'

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
   app_name: ['mol'],
   license_key: 'b5c40e1121e01da2bcadef91d19454e3feb4f35c',
   logging: {
       level: 'info'
   },
   agent_enabled: false
}
