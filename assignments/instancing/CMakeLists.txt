file(
 GLOB_RECURSE instancing_INC CONFIGURE_DEPENDS
 RELATIVE ${CMAKE_CURRENT_SOURCE_DIR}
 *.h *.hpp
)

file(
 GLOB_RECURSE instancing_SRC CONFIGURE_DEPENDS
 RELATIVE ${CMAKE_CURRENT_SOURCE_DIR}
 *.c *.cpp
)
#Copies this instancing's asset folder to bin when it is built
add_custom_target(copyAssetsA7 ALL COMMAND ${CMAKE_COMMAND} -E copy_directory
${CMAKE_CURRENT_SOURCE_DIR}/assets/
${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/assets/)

install(FILES ${instancing_INC} DESTINATION include/instancing)
add_executable(instancing ${instancing_SRC} ${instancing_INC})
target_link_libraries(instancing PUBLIC core IMGUI glm)
target_include_directories(instancing PUBLIC ${CORE_INC_DIR} ${stb_INCLUDE_DIR})

#Trigger asset copy when instancing is built
add_dependencies(instancing copyAssetsA7)