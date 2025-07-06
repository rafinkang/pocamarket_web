import { Tree, TreeItem, TreeProvider } from "@/components/ui/tree";
import { Folder, FileText } from "lucide-react";

export default function SpringbootSourceTree(variant = "outline") {
  // 기본으로 열려있는 상태로 노출될 폴더 아이디
  const defaultExpandedIds = ['root', 'main', 'main-java', 'com', 'venvas', 'pocamarket', 'service', 'infrastructure', 'user'];
  
  return (
    <TreeProvider 
      className="w-full max-w-md" 
      variant={variant} 
      defaultExpandedIds={defaultExpandedIds}
    >
      <Tree>
        <TreeItem nodeId="root" label="Pocamarket API" icon={<Folder />} hasChildren>
          {/* main 폴더 */}
          <TreeItem nodeId="main" label="main" icon={<Folder />} level={1} hasChildren>
            {/* java 폴더 */}
            <TreeItem nodeId="main-java" label="java" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="com" label="com" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="venvas" label="venvas" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="pocamarket" label="pocamarket" icon={<Folder />} level={5} hasChildren>
                    
                    {/* common 폴더 */}
                    <TreeItem nodeId="common" label="common" icon={<Folder />} level={6} hasChildren>
                      <TreeItem nodeId="common-aop" label="aop" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="trim" label="trim" icon={<Folder />} level={8} />
                      </TreeItem>
                      <TreeItem nodeId="common-dto" label="dto" icon={<Folder />} level={7} />
                      <TreeItem nodeId="common-exception" label="exception" icon={<Folder />} level={7} />
                      <TreeItem nodeId="common-util" label="util" icon={<Folder />} level={7} />
                    </TreeItem>

                    {/* infrastructure 폴더 */}
                    <TreeItem nodeId="infrastructure" label="infrastructure" icon={<Folder />} level={6} hasChildren>
                      <TreeItem nodeId="infra-config" label="config" icon={<Folder />} level={7} />
                      <TreeItem nodeId="infra-script" label="script" icon={<Folder />} level={7} />
                      <TreeItem nodeId="infra-security" label="security" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="oauth2" label="oauth2" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="oauth2-user" label="user" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>
                      <TreeItem nodeId="infra-util" label="util" icon={<Folder />} level={7} />
                    </TreeItem>

                    {/* service 폴더 */}
                    <TreeItem nodeId="service" label="service" icon={<Folder />} level={6} hasChildren>
                      
                      {/* pokemon 서비스 */}
                      <TreeItem nodeId="pokemon" label="pokemon" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="pokemon-api" label="api" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="pokemon-controller" label="controller" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-validator" label="validator" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="pokemon-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="pokemon-app-dto" label="dto" icon={<Folder />} level={9} hasChildren>
                            <TreeItem nodeId="pokemonability" label="pokemonability" icon={<Folder />} level={10} />
                            <TreeItem nodeId="pokemonattack" label="pokemonattack" icon={<Folder />} level={10} />
                            <TreeItem nodeId="pokemoncard" label="pokemoncard" icon={<Folder />} level={10} />
                          </TreeItem>
                          <TreeItem nodeId="pokemon-mapper" label="mapper" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-app-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="pokemon-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="pokemon-entity" label="entity" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-domain-exception" label="exception" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-repository" label="repository" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-value" label="value" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="pokemon-infrastructure" label="infrastructure" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="pokemon-persistence" label="persistence" icon={<Folder />} level={9} />
                          <TreeItem nodeId="pokemon-infra-security" label="security" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>

                      {/* trade 서비스 */}
                      <TreeItem nodeId="trade" label="trade" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="trade-api" label="api" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="trade-controller" label="controller" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-validator" label="validator" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="trade-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="trade-dto" label="dto" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="trade-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="trade-entity" label="entity" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-enums" label="enums" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-exception" label="exception" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-repository" label="repository" icon={<Folder />} level={9} />
                          <TreeItem nodeId="trade-value" label="value" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>

                      {/* user 서비스 */}
                      <TreeItem nodeId="user" label="user" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="user-api" label="api" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="user-controller" label="controller" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="user-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="user-dto" label="dto" icon={<Folder />} level={9} />
                          <TreeItem nodeId="user-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="user-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="user-entity" label="entity" icon={<Folder />} level={9} />
                          <TreeItem nodeId="user-enums" label="enums" icon={<Folder />} level={9} />
                          <TreeItem nodeId="user-exception" label="exception" icon={<Folder />} level={9} />
                          <TreeItem nodeId="user-repository" label="repository" icon={<Folder />} level={9} />
                          <TreeItem nodeId="user-value" label="value" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeItem>

            {/* resources 폴더 */}
            <TreeItem nodeId="resources" label="resources" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="sample" label="sample" icon={<Folder />} level={3} />
              <TreeItem nodeId="static" label="static" icon={<Folder />} level={3} />
              <TreeItem nodeId="templates" label="templates" icon={<Folder />} level={3} />
            </TreeItem>
          </TreeItem>

          {/* test 폴더 */}
          <TreeItem nodeId="test" label="test" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="test-java" label="java" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="test-com" label="com" icon={<Folder />} level={3} hasChildren>
                <TreeItem nodeId="test-venvas" label="venvas" icon={<Folder />} level={4} hasChildren>
                  <TreeItem nodeId="test-pocamarket" label="pocamarket" icon={<Folder />} level={5} hasChildren>
                    
                    {/* test common */}
                    <TreeItem nodeId="test-common" label="common" icon={<Folder />} level={6} hasChildren>
                      <TreeItem nodeId="test-common-exception" label="exception" icon={<Folder />} level={7} />
                      <TreeItem nodeId="test-common-util" label="util" icon={<Folder />} level={7} />
                    </TreeItem>

                    {/* test config */}
                    <TreeItem nodeId="test-config" label="config" icon={<Folder />} level={6} />

                    {/* test infrastructure */}
                    <TreeItem nodeId="test-infrastructure" label="infrastructure" icon={<Folder />} level={6} hasChildren>
                      <TreeItem nodeId="test-infra-script" label="script" icon={<Folder />} level={7} />
                    </TreeItem>

                    {/* test service */}
                    <TreeItem nodeId="test-service" label="service" icon={<Folder />} level={6} hasChildren>
                      
                      {/* test pokemon */}
                      <TreeItem nodeId="test-pokemon" label="pokemon" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="test-pokemon-api" label="api" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-pokemon-controller" label="controller" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-validator" label="validator" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="test-pokemon-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-pokemon-dto" label="dto" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-mapper" label="mapper" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="test-pokemon-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-pokemon-entity" label="entity" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-exception" label="exception" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-repository" label="repository" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-value" label="value" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="test-pokemon-infrastructure" label="infrastructure" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-pokemon-infra-config" label="config" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-persistence" label="persistence" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-pokemon-security" label="security" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>

                      {/* test trade */}
                      <TreeItem nodeId="test-trade" label="trade" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="test-trade-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-trade-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="test-trade-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-trade-repository" label="repository" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>

                      {/* test user */}
                      <TreeItem nodeId="test-user" label="user" icon={<Folder />} level={7} hasChildren>
                        <TreeItem nodeId="test-user-application" label="application" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-user-dto" label="dto" icon={<Folder />} level={9} />
                          <TreeItem nodeId="test-user-service" label="service" icon={<Folder />} level={9} />
                        </TreeItem>
                        <TreeItem nodeId="test-user-domain" label="domain" icon={<Folder />} level={8} hasChildren>
                          <TreeItem nodeId="test-user-entity" label="entity" icon={<Folder />} level={9} />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeItem>
            </TreeItem>

            {/* test resources */}
            <TreeItem nodeId="test-resources" label="resources" icon={<Folder />} level={2} />
          </TreeItem>
        </TreeItem>
      </Tree>
    </TreeProvider>
  )
}