export const qCharacterData = `
  query (
    $character: String!,
    $server: String!,
    $region: String!,
    $startTime: Float = 0,
    $endTime: Float = 100000000
  ) {
    characterData {
      character(name: $character, serverSlug: $server, serverRegion: $region) {
        id
        classID
        name
        guildRank
        level
        server {
          id
          name
          region {
            id
            name: compactName
          }
        }
        faction {
          id
          name
        }
        guilds {
          id
          name
        }
        recentReports (limit: 3) {
          total
          data {
            events(startTime: $startTime, endTime: $endTime) {
              data
            }
          }
        }
      }
    }
  }
`

export const qGuildReports = `
  query ($guildID: Int!) {
    reportData {
      reports(guildID: $guildID) {
        data {
          code
          visibility
        }
      }
    }
  }
`

export const qWorldData = `
  query {
    worldData {
      regions {
        id
        value: compactName
        label: name
        children: servers {
          data {
            id
            label: name
            value: slug
          }
        }
      }
    }
  }
`

export const qZoneData = `
  query {
    worldData {
      zones {
        id
        name
        brackets {
          bucket
        }
      }
    }
  }
`

export default {
  qCharacterData,
  qGuildReports,
  qWorldData
}
